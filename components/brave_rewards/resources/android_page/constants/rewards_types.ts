/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

export const enum types {
  CREATE_WALLET = '@@rewards/CREATE_WALLET',
  WALLET_CREATED = '@@rewards/WALLET_CREATED',
  WALLET_CREATE_FAILED = '@@rewards/WALLET_CREATE_FAILED',
  ON_SETTING_SAVE = '@@rewards/ON_SETTING_SAVE',
  UPDATE_ADS_REWARDS = '@@rewards/UPDATE_ADS_REWARDS',
  ON_REWARDS_PARAMETERS = '@@rewards/ON_REWARDS_PARAMETERS',
  GET_REWARDS_PARAMETERS = '@@rewards/GET_REWARDS_PARAMETERS',
  GET_AUTO_CONTRIBUTE_PROPERTIES = '@@rewards/GET_AUTO_CONTRIBUTE_PROPERTIES',
  ON_AUTO_CONTRIBUTE_PROPERTIES = '@@rewards/ON_AUTO_CONTRIBUTE_PROPERTIES',
  FETCH_PROMOTIONS = '@@rewards/FETCH_PROMOTIONS',
  ON_PROMOTIONS = '@@rewards/ON_PROMOTION',
  CLAIM_PROMOTION = '@@rewards/CLAIM_PROMOTION',
  DELETE_PROMOTION = '@@rewards/DELETE_PROMOTION',
  ON_PROMOTION_FINISH = '@@rewards/ON_PROMOTION_FINISH',
  GET_WALLLET_PASSPHRASE = '@@rewards/GET_WALLLET_PASSPHRASE',
  ON_WALLLET_PASSPHRASE = '@@rewards/ON_WALLLET_PASSPHRASE',
  ON_MODAL_BACKUP_CLOSE = '@@rewards/ON_MODAL_BACKUP_CLOSE',
  ON_MODAL_BACKUP_OPEN = '@@rewards/ON_MODAL_BACKUP_OPEN',
  ON_CLEAR_ALERT = '@@rewards/ON_CLEAR_ALERT',
  ON_RECONCILE_STAMP = '@@rewards/ON_RECONCILE_STAMP',
  ON_CONTRIBUTE_LIST = '@@rewards/ON_CONTRIBUTE_LIST',
  ON_EXCLUDE_PUBLISHER = '@@rewards/ON_EXCLUDE_PUBLISHER',
  ON_RESTORE_PUBLISHERS = '@@rewards/ON_RESTORE_PUBLISHERS',
  CHECK_WALLET_EXISTENCE = '@@rewards/CHECK_WALLET_EXISTENCE',
  ON_WALLET_EXISTS = '@@rewards/ON_WALLET_EXISTS',
  ON_EXCLUDED_PUBLISHERS_NUMBER = '@@rewards/ON_EXCLUDED_PUBLISHERS_NUMBER',
  ON_CONTRIBUTION_AMOUNT = '@@rewards/ON_CONTRIBUTION_AMOUNT',
  ON_RECURRING_TIPS = '@@rewards/ON_RECURRING_TIPS',
  REMOVE_RECURRING_TIP = '@@rewards/REMOVE_RECURRING_TIP',
  ON_CURRENT_TIPS = '@@rewards/ON_CURRENT_TIPS',
  GET_TIP_TABLE = '@@rewards/GET_TIP_TABLE',
  GET_CONTRIBUTE_LIST = '@@rewards/GET_CONTRIBUTE_LIST',
  INIT_AUTOCONTRIBUTE_SETTINGS = '@@rewards/INIT_AUTOCONTRIBUTE_SETTINGS',
  GET_ADS_DATA = '@@rewards/GET_ADS_DATA',
  ON_ADS_DATA = '@@rewards/ON_ADS_DATA',
  ON_ADS_SETTING_SAVE = '@@rewards/ON_ADS_SETTING_SAVE',
  GET_BALANCE_REPORT = '@@rewards/GET_BALANCE_REPORT',
  ON_BALANCE_REPORT = '@@rewards/ON_BALANCE_REPORT',
  GET_RECONCILE_STAMP = '@@rewards/GET_RECONCILE_STAMP',
  GET_PENDING_CONTRIBUTIONS = '@@rewards/GET_PENDING_CONTRIBUTIONS',
  ON_PENDING_CONTRIBUTIONS = '@@rewards/ON_PENDING_CONTRIBUTIONS',
  ON_REWARDS_ENABLED = '@@rewards/ON_REWARDS_ENABLED',
  GET_TRANSACTION_HISTORY = '@@rewards/GET_TRANSACTION_HISTORY',
  ON_TRANSACTION_HISTORY = '@@rewards/ON_TRANSACTION_HISTORY',
  ON_TRANSACTION_HISTORY_CHANGED = '@@rewards/ON_TRANSACTION_HISTORY_CHANGED',
  GET_REWARDS_MAIN_ENABLED = '@@rewards/GET_REWARDS_MAIN_ENABLED',
  ON_RECURRING_TIP_SAVED = '@@rewards/ON_RECURRING_TIP_SAVED',
  ON_RECURRING_TIP_REMOVED = '@@rewards/ON_RECURRING_TIP_REMOVED',
  ON_INLINE_TIP_SETTINGS_CHANGE = '@@rewards/ON_INLINE_TIP_SETTINGS_CHANGE',
  REMOVE_PENDING_CONTRIBUTION = '@@rewards/REMOVE_PENDING_CONTRIBUTION',
  REMOVE_ALL_PENDING_CONTRIBUTION = '@@rewards/REMOVE_ALL_PENDING_CONTRIBUTION',
  ON_EXCLUDED_LIST = '@@rewards/ON_EXCLUDED_LIST',
  ON_RESTORE_PUBLISHER = '@@rewards/ON_RESTORE_PUBLISHER',
  GET_EXCLUDED_SITES = '@@rewards/GET_EXCLUDED_SITES',
  GET_BALANCE = '@@rewards/GET_BALANCE',
  ON_BALANCE = '@@rewards/ON_BALANCE',
  ONLY_ANON_WALLET = '@@rewards/ONLY_ANON_WALLET',
  ON_ONLY_ANON_WALLET = '@@rewards/ON_ONLY_ANON_WALLET'
}
