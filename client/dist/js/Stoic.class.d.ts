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
declare class Stoic {
    #private;
    private params;
    static instance: Stoic;
    private quotes;
    private loadingStatus;
    private waitTimeout;
    private quoteElement;
    private authorElement;
    constructor(params?: Params);
    nextQuote(): void;
    hide(): void;
    show(): void;
}
