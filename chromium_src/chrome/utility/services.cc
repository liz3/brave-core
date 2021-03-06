/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "build/build_config.h"

#if !defined(OS_ANDROID)
#include "brave/utility/importer/brave_profile_import_impl.h"
#define ProfileImportImpl BraveProfileImportImpl
#endif

#include "../../../../chrome/utility/services.cc"

#if !defined(OS_ANDROID)
#undef ProfileImportImpl
#endif
