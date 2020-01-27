import {HttpRequest} from "./http-request.class";


export interface IHttpInterceptor {
    intercept(request: HttpRequest): HttpRequest;
}
