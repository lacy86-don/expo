"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBabelConfig = void 0;
exports.resolveBabelrcName = resolveBabelrcName;
/**
 * Copyright (c) 650 Industries (Expo). All rights reserved.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function resolveBabelrcName(projectRoot) {
    // Check for various babel config files in the project root
    const possibleBabelRCPaths = ['.babelrc', '.babelrc.js', 'babel.config.js'];
    return possibleBabelRCPaths.find((configFileName) => {
        return node_fs_1.default.existsSync(node_path_1.default.resolve(projectRoot, configFileName));
    });
}
/**
 * Returns a memoized function that checks for the existence of a
 * project-level .babelrc file. If it doesn't exist, it reads the
 * default React Native babelrc file and uses that.
 */
exports.loadBabelConfig = (function () {
    let babelRC = null;
    return function _getBabelRC({ projectRoot, enableBabelRCLookup = true, extendsBabelConfigPath, }) {
        if (babelRC !== null) {
            return babelRC;
        }
        babelRC = {};
        if (enableBabelRCLookup && extendsBabelConfigPath) {
            babelRC.extends = node_path_1.default.resolve(projectRoot, extendsBabelConfigPath);
        }
        else if (projectRoot && enableBabelRCLookup) {
            // NOTE(@kitten): We forcefully set `extendsBabelConfigPath`, but if it's missing,
            // we fall back to resolving the Babel config ourselves
            const foundBabelRCName = resolveBabelrcName(projectRoot);
            if (foundBabelRCName) {
                babelRC.extends = node_path_1.default.resolve(projectRoot, foundBabelRCName);
            }
        }
        // Use the default preset for react-native if no babel config file is found
        if (!babelRC.extends) {
            try {
                babelRC.presets = [require('expo/internal/babel-preset')];
            }
            catch {
                // TODO(@kitten): Temporary, since our E2E tests don't use monorepo
                // packages consistently, including the `expo` package
                babelRC.presets = [require('babel-preset-expo')];
            }
        }
        return babelRC;
    };
})();
//# sourceMappingURL=loadBabelConfig.js.map