import {HttpRequestConfig} from "../types/http-request-config.class";
import {HttpConfigurations} from "../types/http-configurations";

export class HttpConfigFactory {

    public static getHttpPostConfigFor(config: HttpRequestConfig): HttpRequestConfig {
        const httpPostConfiguration: HttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary.POST;

        return {
            method: !config.method ? httpPostConfiguration.method : config.method,
            referrer: !config.referrer ?  httpPostConfiguration.referrer : config.referrer,
            redirect: !config.redirect ? httpPostConfiguration.redirect : config.redirect,
            headers: !config.headers ? httpPostConfiguration.headers :  {
                ...config.headers,
                ...httpPostConfiguration.headers,
            },
            credentials: !config.credentials ? httpPostConfiguration.credentials : config.credentials,
            mode: !config.mode ? httpPostConfiguration.mode : config.mode,
            cache: !config.cache ? httpPostConfiguration.cache : config.cache,
            requestObject: !config.requestObject ? httpPostConfiguration.requestObject : config.requestObject,
        };
    }

    public static getHttpGetConfigFor(config: HttpRequestConfig): HttpRequestConfig {
        const httpPostConfiguration: HttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary.GET;

        return {
            method: !config.method ? httpPostConfiguration.method : config.method,
            referrer: !config.referrer ?  httpPostConfiguration.referrer : config.referrer,
            redirect: !config.redirect ? httpPostConfiguration.redirect : config.redirect,
            headers: !config.headers ? httpPostConfiguration.headers :  {
                ...config.headers,
                ...httpPostConfiguration.headers,
            },
            credentials: !config.credentials ? httpPostConfiguration.credentials : config.credentials,
            mode: !config.mode ? httpPostConfiguration.mode : config.mode,
            cache: !config.cache ? httpPostConfiguration.cache : config.cache,
            requestObject: !config.requestObject ? httpPostConfiguration.requestObject : config.requestObject
        };
    }

    public static getHttpPutConfigFor(config: HttpRequestConfig): HttpRequestConfig {
        const httpPostConfiguration: HttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary.PUT;

        return {
            method: !config.method ? httpPostConfiguration.method : config.method,
            referrer: !config.referrer ?  httpPostConfiguration.referrer : config.referrer,
            redirect: !config.redirect ? httpPostConfiguration.redirect : config.redirect,
            headers: !config.headers ? httpPostConfiguration.headers : {
                ...config.headers,
                ...httpPostConfiguration.headers,
            },
            credentials: !config.credentials ? httpPostConfiguration.credentials : config.credentials,
            mode: !config.mode ? httpPostConfiguration.mode : config.mode,
            cache: !config.cache ? httpPostConfiguration.cache : config.cache,
            requestObject: !config.requestObject ? httpPostConfiguration.requestObject : config.requestObject
        };
    }
}
