import {HttpRequestConfig} from "../types/http-request-config.class";
import {HttpConfigurations} from "../types/http-configurations";
import {HttpRequestConfigurationsEnum} from "../types/http-configurations.enum";

export class HttpConfigFactory {

    public static getHttpPostConfigFor(config: HttpRequestConfig): HttpRequestConfig {
        const httpPostConfiguration: HttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.POST];

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
        const httpPostConfiguration: HttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.GET];

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
        const httpPostConfiguration: HttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.PUT];

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

    public static getHttpPatchConfigFor(config: HttpRequestConfig): HttpRequestConfig {
        const httpPostConfiguration: HttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.PATCH];

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

    public static getHttpDeleteConfigFor(config: HttpRequestConfig): HttpRequestConfig {
        const httpPostConfiguration: HttpRequestConfig = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.DELETE];

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
