import { HttpConfigFactory } from "./factories/http-config.factory";
import { HttpRequestMapper } from "./mappers/http-request.mapper";
import { fromPromise } from "rxjs/internal-compatibility";
import { catchError } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";
var RxJSHttpClient = /** @class */ (function () {
    function RxJSHttpClient() {
    }
    RxJSHttpClient.prototype.get = function (url, config) {
        if (config === void 0) { config = {}; }
        var requestConfig = HttpConfigFactory.getHttpGetConfigFor(config);
        var configObject = HttpRequestMapper.mapRequestInitFor(requestConfig);
        return fromPromise(fetch(url, configObject)
            .then(function (res) { return res.json(); }))
            .pipe(catchError(function (error) { return of(error); }));
    };
    RxJSHttpClient.prototype.post = function (url, config) {
        if (config === void 0) { config = {}; }
        var requestConfig = HttpConfigFactory.getHttpPostConfigFor(config);
        var configObject = HttpRequestMapper.mapRequestInitFor(requestConfig);
        return fromPromise(fetch(url, configObject)
            .then(function (res) { return res.json(); }))
            .pipe(catchError(function (error) { return of(error); }));
    };
    RxJSHttpClient.prototype.put = function (url, config) {
        if (config === void 0) { config = {}; }
        var requestConfig = HttpConfigFactory.getHttpPutConfigFor(config);
        var configObject = HttpRequestMapper.mapRequestInitFor(requestConfig);
        return fromPromise(fetch(url, configObject)
            .then(function (res) { return res.json(); }))
            .pipe(catchError(function (error) { return of(error); }));
    };
    RxJSHttpClient.prototype.patch = function (url, config) {
        if (config === void 0) { config = {}; }
        var requestConfig = HttpConfigFactory.getHttpPatchConfigFor(config);
        var configObject = HttpRequestMapper.mapRequestInitFor(requestConfig);
        return fromPromise(fetch(url, configObject)
            .then(function (res) { return res.json(); }))
            .pipe(catchError(function (error) { return of(error); }));
    };
    RxJSHttpClient.prototype.delete = function (url, config) {
        if (config === void 0) { config = {}; }
        var requestConfig = HttpConfigFactory.getHttpDeleteConfigFor(config);
        var configObject = HttpRequestMapper.mapRequestInitFor(requestConfig);
        return fromPromise(fetch(url, configObject)
            .then(function (res) { return res.json(); }))
            .pipe(catchError(function (error) { return of(error); }));
    };
    return RxJSHttpClient;
}());
export { RxJSHttpClient };
