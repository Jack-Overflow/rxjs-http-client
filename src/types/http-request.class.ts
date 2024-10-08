import {urlRegex} from '../helpers/url.regex';
import {HttpRequestConfig} from './http-request-config.class';

export class HttpRequest {
    public url: string;
    public headers: { [headerName: string]: string };
    public mode: RequestMode;
    public cache: RequestCache;
    public credentials: RequestCredentials;
    public redirect: RequestRedirect;
    public referrer: string;
    public body: any;

    constructor(url: string, config: Partial<HttpRequestConfig>) {
        this.url = new RegExp(urlRegex).test(url) ? url : `${window.location.origin}${url}`;
        this.mode = config.mode || undefined;
        this.cache = config.cache || undefined;
        this.credentials = config.credentials || undefined;
        this.headers = config.headers || {};
        this.redirect = config.redirect || undefined;
        this.referrer = config.referrer || undefined;
        this.body = config.body || undefined;
    }

    public clone(): HttpRequest {
        return new HttpRequest(this.url, {
            body: this.body,
            cache: this.cache,
            mode: this.mode,
            credentials: this.credentials,
            headers: this.headers,
            redirect: this.redirect,
            referrer: this.referrer
        });
    }
}
