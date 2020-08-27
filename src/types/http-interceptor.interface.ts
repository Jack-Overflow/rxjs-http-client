export interface IHttpInterceptor<T> {
    intercept(data: T): T;
}
