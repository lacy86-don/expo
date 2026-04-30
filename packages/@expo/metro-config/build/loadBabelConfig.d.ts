import type { TransformOptions } from './babel-core';
export declare function resolveBabelrcName(projectRoot: string): string | undefined;
/**
 * Returns a memoized function that checks for the existence of a
 * project-level .babelrc file. If it doesn't exist, it reads the
 * default React Native babelrc file and uses that.
 */
export declare const loadBabelConfig: ({ projectRoot, enableBabelRCLookup, extendsBabelConfigPath, }: {
    projectRoot: string;
    enableBabelRCLookup?: boolean;
    extendsBabelConfigPath?: string | undefined;
}) => Pick<TransformOptions, "extends" | "presets">;
