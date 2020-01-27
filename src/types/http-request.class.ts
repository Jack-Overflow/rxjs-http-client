import * as _ from 'lodash';
import {HttpRequestConfig} from "./http-request-config.class";
import {urlRegex} from "../helpers/url.regex";

export class HttpRequest {
    public url: string;
    public mode: RequestMode;
    public cache: RequestCache;
    public credentials: RequestCredentials;
    public redirect: RequestRedirect;
    public referrer: string;
    public body: any;

    private _headers: { [headerName: string]: string };

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

    public get headers(): { [headerName: string]: string } {
        return this._headers;
    }

    public set headers(headers: { [headerName: string]: string }) {
        if (headers.hasOwnProperty('Content-Type')) {
            this._headers = headers;
        } else {
            this._headers = {
                'Content-Type': 'application/json',
                ...headers
            }
        }
    }

    public clone(): HttpRequest {
        return _.cloneDeep(this);
    }
}
