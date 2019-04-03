export abstract class HttpRequestConfig {
    public method?: string;
    public mode?: string;
    public cache?: string;
    public credentials?: string;
    public headers?: {[headerName: string]: string};
    public redirect?: string;
    public referrer?: string;
    public requestObject?: object;
}
