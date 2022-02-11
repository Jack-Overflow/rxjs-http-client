import { IHttpInterceptor } from "./http-interceptor.interface";

export class HttpInterceptors<T> {
    private readonly _interceptors: Array<IHttpInterceptor<T>>;

    constructor(interceptors: Array<IHttpInterceptor<T>>) {
        this._interceptors = interceptors;
    }

    public execute(data: T): T {
        if (this._interceptors.length > 0) {
            return this._interceptors.reduce((a, b) => b.intercept(a), data);
        }

        return data;
    }
}
