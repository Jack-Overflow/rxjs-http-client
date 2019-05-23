var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { HttpConfigurations } from "../types/http-configurations";
import { HttpRequestConfigurationsEnum } from "../types/http-configurations.enum";
var HttpConfigFactory = /** @class */ (function () {
    function HttpConfigFactory() {
    }
    HttpConfigFactory.getHttpPostConfigFor = function (config) {
        var httpPostConfiguration = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.POST];
        return {
            method: !config.method ? httpPostConfiguration.method : config.method,
            referrer: !config.referrer ? httpPostConfiguration.referrer : config.referrer,
            redirect: !config.redirect ? httpPostConfiguration.redirect : config.redirect,
            headers: !config.headers ? httpPostConfiguration.headers : __assign({}, config.headers, httpPostConfiguration.headers),
            credentials: !config.credentials ? httpPostConfiguration.credentials : config.credentials,
            mode: !config.mode ? httpPostConfiguration.mode : config.mode,
            cache: !config.cache ? httpPostConfiguration.cache : config.cache,
            requestObject: !config.requestObject ? httpPostConfiguration.requestObject : config.requestObject,
        };
    };
    HttpConfigFactory.getHttpGetConfigFor = function (config) {
        var httpPostConfiguration = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.GET];
        return {
            method: !config.method ? httpPostConfiguration.method : config.method,
            referrer: !config.referrer ? httpPostConfiguration.referrer : config.referrer,
            redirect: !config.redirect ? httpPostConfiguration.redirect : config.redirect,
            headers: !config.headers ? httpPostConfiguration.headers : __assign({}, config.headers, httpPostConfiguration.headers),
            credentials: !config.credentials ? httpPostConfiguration.credentials : config.credentials,
            mode: !config.mode ? httpPostConfiguration.mode : config.mode,
            cache: !config.cache ? httpPostConfiguration.cache : config.cache,
            requestObject: !config.requestObject ? httpPostConfiguration.requestObject : config.requestObject
        };
    };
    HttpConfigFactory.getHttpPutConfigFor = function (config) {
        var httpPostConfiguration = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.PUT];
        return {
            method: !config.method ? httpPostConfiguration.method : config.method,
            referrer: !config.referrer ? httpPostConfiguration.referrer : config.referrer,
            redirect: !config.redirect ? httpPostConfiguration.redirect : config.redirect,
            headers: !config.headers ? httpPostConfiguration.headers : __assign({}, config.headers, httpPostConfiguration.headers),
            credentials: !config.credentials ? httpPostConfiguration.credentials : config.credentials,
            mode: !config.mode ? httpPostConfiguration.mode : config.mode,
            cache: !config.cache ? httpPostConfiguration.cache : config.cache,
            requestObject: !config.requestObject ? httpPostConfiguration.requestObject : config.requestObject
        };
    };
    HttpConfigFactory.getHttpPatchConfigFor = function (config) {
        var httpPostConfiguration = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.PATCH];
        return {
            method: !config.method ? httpPostConfiguration.method : config.method,
            referrer: !config.referrer ? httpPostConfiguration.referrer : config.referrer,
            redirect: !config.redirect ? httpPostConfiguration.redirect : config.redirect,
            headers: !config.headers ? httpPostConfiguration.headers : __assign({}, config.headers, httpPostConfiguration.headers),
            credentials: !config.credentials ? httpPostConfiguration.credentials : config.credentials,
            mode: !config.mode ? httpPostConfiguration.mode : config.mode,
            cache: !config.cache ? httpPostConfiguration.cache : config.cache,
            requestObject: !config.requestObject ? httpPostConfiguration.requestObject : config.requestObject
        };
    };
    HttpConfigFactory.getHttpDeleteConfigFor = function (config) {
        var httpPostConfiguration = HttpConfigurations.httpConfigurationsDictionary[HttpRequestConfigurationsEnum.DELETE];
        return {
            method: !config.method ? httpPostConfiguration.method : config.method,
            referrer: !config.referrer ? httpPostConfiguration.referrer : config.referrer,
            redirect: !config.redirect ? httpPostConfiguration.redirect : config.redirect,
            headers: !config.headers ? httpPostConfiguration.headers : __assign({}, config.headers, httpPostConfiguration.headers),
            credentials: !config.credentials ? httpPostConfiguration.credentials : config.credentials,
            mode: !config.mode ? httpPostConfiguration.mode : config.mode,
            cache: !config.cache ? httpPostConfiguration.cache : config.cache,
            requestObject: !config.requestObject ? httpPostConfiguration.requestObject : config.requestObject
        };
    };
    return HttpConfigFactory;
}());
export { HttpConfigFactory };
