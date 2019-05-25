import {RxjsHttpRequestConfig} from "../types/http-request-config.class";
import {HttpRequestConfigurationsEnum} from "../types/http-configurations.enum";
import {HttpConfigurations} from "../types/http-configurations";

export class HttpRequestMapper {
    public static mapRequestInitFor(httpRequestConfig: Partial<RxjsHttpRequestConfig> = {}, configType: HttpRequestConfigurationsEnum): RequestInit {
        const defaultConfig: RxjsHttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary[configType];

        return {
            cache: httpRequestConfig.cache ? httpRequestConfig.cache : defaultConfig.cache,
            mode: httpRequestConfig.mode ? httpRequestConfig.mode : defaultConfig.mode,
            credentials: httpRequestConfig.credentials ? httpRequestConfig.credentials : defaultConfig.credentials,
            headers: {
                ...defaultConfig.headers,
                ...httpRequestConfig.headers ? httpRequestConfig.headers : undefined
            } as HeadersInit,
            redirect: httpRequestConfig.redirect ? httpRequestConfig.redirect : defaultConfig.redirect,
            referrer: httpRequestConfig.referrer ? httpRequestConfig.referrer  : defaultConfig.referrer,
            method: httpRequestConfig.method ? httpRequestConfig.method : defaultConfig.method,
            body: httpRequestConfig.requestObject ? JSON.stringify(httpRequestConfig.requestObject) : null,
        };
    }
}

