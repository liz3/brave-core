/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BAT_ADS_INTERNAL_FREQUENCY_CAPPING_EXCLUSION_RULES_SUBDIVISION_TARGETING_FREQUENCY_CAP_H_  // NOLINT
#define BAT_ADS_INTERNAL_FREQUENCY_CAPPING_EXCLUSION_RULES_SUBDIVISION_TARGETING_FREQUENCY_CAP_H_  // NOLINT

#include <string>

#include "bat/ads/internal/frequency_capping/exclusion_rule.h"

namespace ads {

class FrequencyCapping;
class SubdivisionTargeting;
struct CreativeAdnfo;

class SubdivisionTargetingFrequencyCap : public ExclusionRule {
 public:
  SubdivisionTargetingFrequencyCap(
      const FrequencyCapping* const frequency_capping,
      const SubdivisionTargeting* const subdivision_targeting);

  ~SubdivisionTargetingFrequencyCap() override;

  SubdivisionTargetingFrequencyCap(
      const SubdivisionTargetingFrequencyCap&) = delete;
  SubdivisionTargetingFrequencyCap& operator=(
      const SubdivisionTargetingFrequencyCap&) = delete;

  bool ShouldExclude(
      const CreativeAdInfo& ad) override;

  std::string GetLastMessage() const override;

 private:
  const FrequencyCapping* const frequency_capping_;  // NOT OWNED
  const SubdivisionTargeting* const subdivision_targeting_;  // NOT OWNED

  std::string last_message_;

  bool DoesRespectCap(
      const CreativeAdInfo& ad) const;

  bool DoesAdSupportSubdivisionTargetingCode(
      const CreativeAdInfo& ad,
      const std::string& subdivision_targeting_code) const;

  std::string GetCountryCode(
      const std::string& subdivision_targeting_code) const;
};

}  // namespace ads

#endif  // BAT_ADS_INTERNAL_FREQUENCY_CAPPING_EXCLUSION_RULES_SUBDIVISION_TARGETING_FREQUENCY_CAP_H_  // NOLINT
