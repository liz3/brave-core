/* Copyright (c) 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include <utility>

#include "base/json/json_reader.h"
#include "base/strings/stringprintf.h"
#include "bat/ledger/global_constants.h"
#include "bat/ledger/internal/ledger_impl.h"
#include "bat/ledger/internal/uphold/uphold_authorization.h"
#include "bat/ledger/internal/uphold/uphold_util.h"
#include "net/http/http_status_code.h"

using std::placeholders::_1;
using std::placeholders::_2;
using std::placeholders::_3;

namespace braveledger_uphold {

UpholdAuthorization::UpholdAuthorization(
    bat_ledger::LedgerImpl* ledger, Uphold* uphold) :
    ledger_(ledger),
    uphold_(uphold) {
}

UpholdAuthorization::~UpholdAuthorization() {
}

void UpholdAuthorization::Authorize(
    const std::map<std::string, std::string>& args,
    std::map<std::string, ledger::ExternalWalletPtr> wallets,
    ledger::ExternalWalletAuthorizationCallback callback) {
  auto wallet = GetWallet(std::move(wallets));

  if (!wallet) {
    BLOG(0, "Wallet is null");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  const auto current_one_time = wallet->one_time_string;

  wallet->one_time_string = GenerateRandomString(ledger::is_testing);
  ledger_->SaveExternalWallet(ledger::kWalletUphold, wallet->Clone());

  if (args.empty()) {
    BLOG(0, "Arguments are empty");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  std::string code;
  auto it = args.find("code");
  if (it != args.end()) {
    code = args.at("code");
  }

  if (code.empty()) {
    BLOG(0, "Code is empty");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  std::string one_time_string;
  it = args.find("state");
  if (it != args.end()) {
    one_time_string = args.at("state");
  }

  if (one_time_string.empty()) {
    BLOG(0, "One time string is empty");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  if (current_one_time != one_time_string) {
    BLOG(0, "One time string miss match");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  auto headers = RequestAuthorization();
  const std::string payload =
      base::StringPrintf("code=%s&grant_type=authorization_code", code.c_str());
  const std::string url = GetAPIUrl("/oauth2/token");
  auto auth_callback = std::bind(&UpholdAuthorization::OnAuthorize,
      this,
      callback,
      *wallet,
      _1);

  ledger_->LoadURL(
      url,
      headers,
      payload,
      "application/x-www-form-urlencoded",
      ledger::UrlMethod::POST,
      auth_callback);
}

void UpholdAuthorization::OnAuthorize(
    ledger::ExternalWalletAuthorizationCallback callback,
    const ledger::ExternalWallet& wallet,
    const ledger::UrlResponse& response) {
  BLOG(6, ledger::UrlResponseToString(__func__, response));

  if (response.status_code == net::HTTP_UNAUTHORIZED) {
    callback(ledger::Result::EXPIRED_TOKEN, {});
    uphold_->DisconnectWallet();
    return;
  }

  if (response.status_code != net::HTTP_OK) {
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  base::Optional<base::Value> value = base::JSONReader::Read(response.body);
  if (!value || !value->is_dict()) {
    BLOG(0, "Response is not JSON");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  base::DictionaryValue* dictionary = nullptr;
  if (!value->GetAsDictionary(&dictionary)) {
    BLOG(0, "Response is not JSON");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  std::string token;
  const auto* access_token = dictionary->FindStringKey("access_token");
  if (access_token) {
    token = *access_token;
  }

  if (token.empty()) {
    BLOG(0, "Token is empty");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  auto wallet_ptr = ledger::ExternalWallet::New(wallet);

  wallet_ptr->token = token;

  switch (wallet_ptr->status) {
    case ledger::WalletStatus::NOT_CONNECTED: {
      wallet_ptr->status = ledger::WalletStatus::CONNECTED;
      break;
    }
    case ledger::WalletStatus::DISCONNECTED_NOT_VERIFIED: {
      wallet_ptr->status = ledger::WalletStatus::CONNECTED;
      break;
    }
    case ledger::WalletStatus::DISCONNECTED_VERIFIED: {
      wallet_ptr->status = ledger::WalletStatus::VERIFIED;
      break;
    }
    default:
      break;
  }

  auto user_callback = std::bind(&UpholdAuthorization::OnGetUser,
                                  this,
                                  _1,
                                  _2,
                                  callback,
                                  *wallet_ptr);
  uphold_->GetUser(std::move(wallet_ptr), user_callback);
}

void UpholdAuthorization::OnGetUser(
    const ledger::Result result,
    const User& user,
    ledger::ExternalWalletAuthorizationCallback callback,
    const ledger::ExternalWallet& wallet) {
  auto wallet_ptr = ledger::ExternalWallet::New(wallet);
  std::map<std::string, std::string> args;

  if (user.bat_not_allowed) {
    BLOG(0, "BAT not allowed");
    callback(ledger::Result::BAT_NOT_ALLOWED, args);
    return;
  }

  if (user.status == UserStatus::OK) {
    wallet_ptr->status = user.verified
        ? ledger::WalletStatus::VERIFIED
        : ledger::WalletStatus::CONNECTED;

    if (wallet_ptr->address.empty()) {
      auto new_callback = std::bind(&UpholdAuthorization::OnCardCreate,
                                    this,
                                    _1,
                                    _2,
                                    callback,
                                    *wallet_ptr);
      uphold_->CreateCard(std::move(wallet_ptr), new_callback);
      return;
    }

    if (!user.verified) {
      args["redirect_url"] = GetSecondStepVerify();
    }
  } else {
    wallet_ptr->status = ledger::WalletStatus::PENDING;
    args["redirect_url"] = GetSecondStepVerify();
  }

  ledger_->SaveExternalWallet(ledger::kWalletUphold, std::move(wallet_ptr));

  callback(ledger::Result::LEDGER_OK, args);
}

void UpholdAuthorization::OnCardCreate(
    ledger::Result result,
    const std::string& address,
    ledger::ExternalWalletAuthorizationCallback callback,
    const ledger::ExternalWallet& wallet) {
  if (result == ledger::Result::LEDGER_ERROR) {
    BLOG(0, "Card creation");
    callback(ledger::Result::LEDGER_ERROR, {});
    return;
  }

  auto wallet_ptr = ledger::ExternalWallet::New(wallet);

  wallet_ptr->address = address;

  ledger_->SaveExternalWallet(ledger::kWalletUphold, wallet_ptr->Clone());

  std::map<std::string, std::string> args;
  if (wallet_ptr->status != ledger::WalletStatus::VERIFIED) {
    args["redirect_url"] = GetSecondStepVerify();
  }
  callback(ledger::Result::LEDGER_OK, args);
}

}  // namespace braveledger_uphold
