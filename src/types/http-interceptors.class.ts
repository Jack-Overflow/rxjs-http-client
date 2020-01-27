import {IHttpInterceptor} from "./IHttpInterceptor";
import {HttpRequest} from "./http-request.class";

export class HttpInterceptors {
    private readonly _interceptors: Array<IHttpInterceptor>;

    constructor(interceptors: Array<IHttpInterceptor>) {
        this._interceptors = interceptors;
    }

    public execute(request: HttpRequest): HttpRequest {
        if (this._interceptors.length > 0) {
            return this._interceptors.reduce((a, b) => b.intercept(a), request);
        }

        return request;
    }
}
