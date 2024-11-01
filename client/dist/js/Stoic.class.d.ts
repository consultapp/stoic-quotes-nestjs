declare const LOADING_STATUS: {
    readonly idle: "idle";
    readonly pending: "pending";
    readonly loaded: "loaded";
    readonly error: "error";
};
declare const MESSAGE_TYPES: {
    readonly error: "error";
    readonly quote: "quote";
    readonly status: "status";
};
declare const initialParams: Params;
declare const MINIMUM_QUOTES_POOL_LENGTH = 3;
declare function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T;
declare function isValue<T extends object>(x: T, k: any): k is T[typeof k];
type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
declare class Stoic {
    #private;
    private params;
    static instance: Stoic;
    private quotes;
    private loadingStatus;
    private waitTimeout;
    private quoteElement;
    private authorElement;
    private interval;
    constructor(params?: Params);
    nextQuote(): void;
    hide(): void;
    show(): void;
    play(): void;
    stop(): void;
}
