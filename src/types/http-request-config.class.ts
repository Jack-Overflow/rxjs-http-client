export abstract class HttpRequestConfig {
    public mode: RequestMode;
    public cache: RequestCache;
    public credentials: RequestCredentials;
    public headers: {[headerName: string]: string};
    public redirect: RequestRedirect;
    public referrer: string;
    public body: any;
}
