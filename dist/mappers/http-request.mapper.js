var HttpRequestMapper = /** @class */ (function () {
    function HttpRequestMapper() {
    }
    HttpRequestMapper.mapRequestInitFor = function (httpRequestConfig) {
        return {
            cache: httpRequestConfig.cache,
            mode: httpRequestConfig.mode,
            credentials: httpRequestConfig.credentials,
            headers: httpRequestConfig.headers,
            redirect: httpRequestConfig.redirect,
            referrer: httpRequestConfig.referrer,
            method: httpRequestConfig.method,
            body: httpRequestConfig.requestObject ? JSON.stringify(httpRequestConfig.requestObject) : null,
        };
    };
    return HttpRequestMapper;
}());
export { HttpRequestMapper };
