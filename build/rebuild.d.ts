/// <reference types="node" />
import { EventEmitter } from 'events';
export declare type ModuleType = 'prod' | 'dev' | 'optional';
export declare type RebuildMode = 'sequential' | 'parallel';
export interface RebuildOptions {
    buildPath: string;
    electronVersion: string;
    arch?: string;
    extraModules?: string[];
    onlyModules?: string[] | null;
    force?: boolean;
    headerURL?: string;
    types?: ModuleType[];
    mode?: RebuildMode;
    debug?: boolean;
    useCache?: boolean;
    useElectronClang?: boolean;
    cachePath?: string;
    prebuildTagPrefix?: string;
    projectRootPath?: string;
    forceABI?: number;
}
export declare type HashTree = {
    [path: string]: string | HashTree;
};
export interface RebuilderOptions extends RebuildOptions {
    lifecycle: EventEmitter;
}
export declare class Rebuilder {
    ABI: string;
    nodeGypPath: string;
    prodDeps: Set<string>;
    rebuilds: (() => Promise<void>)[];
    realModulePaths: Set<string>;
    realNodeModulesPaths: Set<string>;
    lifecycle: EventEmitter;
    buildPath: string;
    electronVersion: string;
    arch: string;
    extraModules: string[];
    onlyModules: string[] | null;
    force: boolean;
    headerURL: string;
    types: ModuleType[];
    mode: RebuildMode;
    debug: boolean;
    useCache: boolean;
    cachePath: string;
    prebuildTagPrefix: string;
    projectRootPath?: string;
    msvsVersion?: string;
    useElectronClang: boolean;
    constructor(options: RebuilderOptions);
    rebuild(): Promise<void>;
    private hashDirectory;
    private dHashTree;
    private generateCacheKey;
    rebuildModuleAt(modulePath: string): Promise<void>;
    rebuildAllModulesIn(nodeModulesPath: string, prefix?: string): Promise<void>;
    findModule(moduleName: string, fromDir: string, foundFn: ((p: string) => Promise<void>)): Promise<void[]>;
    markChildrenAsProdDeps(modulePath: string): Promise<void>;
}
export declare type RebuilderResult = Promise<void> & {
    lifecycle: EventEmitter;
};
export declare type RebuildFunctionWithOptions = (options: RebuildOptions) => RebuilderResult;
export declare type RebuildFunctionWithArgs = (buildPath: string, electronVersion: string, arch?: string, extraModules?: string[], force?: boolean, headerURL?: string, types?: ModuleType[], mode?: RebuildMode, onlyModules?: string[] | null, debug?: boolean) => RebuilderResult;
export declare type RebuildFunction = RebuildFunctionWithArgs & RebuildFunctionWithOptions;
export declare function createOptions(buildPath: string, electronVersion: string, arch: string, extraModules: string[], force: boolean, headerURL: string, types: ModuleType[], mode: RebuildMode, onlyModules: string[] | null, debug: boolean): RebuildOptions;
export declare const rebuild: RebuildFunction;
export declare function rebuildNativeModules(electronVersion: string, modulePath: string, whichModule: string | undefined, _headersDir: string | null | undefined, arch: string | undefined, _command: string, _ignoreDevDeps?: boolean, _ignoreOptDeps?: boolean, _verbose?: boolean): Promise<void>;