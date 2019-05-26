export abstract class RxjsHttpRequestConfig {
    public method: string;
    public mode: RequestMode;
    public cache: RequestCache;
    public credentials: RequestCredentials;
    public headers: {[headerName: string]: string};
    public redirect: RequestRedirect;
    public referrer: string;
    public requestObject: any;
}
