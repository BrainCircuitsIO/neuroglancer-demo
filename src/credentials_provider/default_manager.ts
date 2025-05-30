/**
 * @license
 * Copyright 2017 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file CredentialsManager for globally registering a CredentialsProvider
 */

import {
  CachingMapBasedCredentialsManager,
  type ProviderGetter,
} from "#src/credentials_provider/index.js";

const providers = new Map<string, ProviderGetter<unknown>>();
export function registerDefaultCredentialsProvider<Credentials>(
  key: string,
  providerGetter: ProviderGetter<Credentials>,
) {
  providers.set(key, providerGetter);
}

export function getDefaultCredentialsManager() {
  const manager = new CachingMapBasedCredentialsManager();
  for (const [key, provider] of providers) {
    manager.register(key, provider);
  }
  return manager;
}
