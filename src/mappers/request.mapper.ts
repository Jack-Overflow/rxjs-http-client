import {HttpRequestConfigurations} from '../types/http-configurations.enum';
import {HttpRequest} from "../types/http-request.class";

export class RequestMapper {
    public static for(httpRequestConfig: HttpRequest, method: HttpRequestConfigurations): RequestInit {
        return {
            cache: httpRequestConfig.cache,
            mode: httpRequestConfig.mode,
            credentials: httpRequestConfig.credentials,
            headers: httpRequestConfig.headers,
            redirect: httpRequestConfig.redirect,
            referrer: httpRequestConfig.referrer,
            method: method,
            body: method !== HttpRequestConfigurations.GET ? JSON.stringify(httpRequestConfig.body) : null
        };
    }
}

