/**
 * Copyright (c) 650 Industries (Expo). All rights reserved.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'node:fs';
import path from 'node:path';

import type { TransformOptions } from './babel-core';

export function resolveBabelrcName(projectRoot: string) {
  // Check for various babel config files in the project root
  const possibleBabelRCPaths = ['.babelrc', '.babelrc.js', 'babel.config.js'];
  return possibleBabelRCPaths.find((configFileName) => {
    return fs.existsSync(path.resolve(projectRoot, configFileName));
  });
}

/**
 * Returns a memoized function that checks for the existence of a
 * project-level .babelrc file. If it doesn't exist, it reads the
 * default React Native babelrc file and uses that.
 */
export const loadBabelConfig = (function () {
  let babelRC: Pick<TransformOptions, 'extends' | 'presets'> | null = null;

  return function _getBabelRC({
    projectRoot,
    enableBabelRCLookup = true,
    extendsBabelConfigPath,
  }: {
    projectRoot: string;
    enableBabelRCLookup?: boolean;
    extendsBabelConfigPath?: string | undefined;
  }) {
    if (babelRC !== null) {
      return babelRC;
    }

    babelRC = {};

    if (enableBabelRCLookup && extendsBabelConfigPath) {
      babelRC.extends = path.resolve(projectRoot, extendsBabelConfigPath);
    } else if (projectRoot && enableBabelRCLookup) {
      // NOTE(@kitten): We forcefully set `extendsBabelConfigPath`, but if it's missing,
      // we fall back to resolving the Babel config ourselves
      const foundBabelRCName = resolveBabelrcName(projectRoot);
      if (foundBabelRCName) {
        babelRC.extends = path.resolve(projectRoot, foundBabelRCName);
      }
    }

    // Use the default preset for react-native if no babel config file is found
    if (!babelRC.extends) {
      try {
        babelRC.presets = [require('expo/internal/babel-preset')];
      } catch {
        // TODO(@kitten): Temporary, since our E2E tests don't use monorepo
        // packages consistently, including the `expo` package
        babelRC.presets = [require('babel-preset-expo')];
      }
    }

    return babelRC;
  };
})();
