import {HttpRequestConfig} from "../types/http-request-config.class";

export class HttpRequestMapper {
    public static mapRequestInitFor(httpRequestConfig: HttpRequestConfig): RequestInit {
        return {
            cache: httpRequestConfig.cache as RequestCache,
            mode: httpRequestConfig.mode as RequestMode,
            credentials: httpRequestConfig.credentials as RequestCredentials,
            headers: httpRequestConfig.headers as HeadersInit,
            redirect: httpRequestConfig.redirect as RequestRedirect,
            referrer: httpRequestConfig.referrer,
            method: httpRequestConfig.method,
            body: httpRequestConfig.requestObject ? JSON.stringify(httpRequestConfig.requestObject) : null,
        };
    }
}

