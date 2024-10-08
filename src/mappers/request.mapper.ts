import {HttpRequestConfigurations} from '../types/http-configurations.enum';
import {HttpRequest} from '../types/http-request.class';

export class RequestMapper {
    public static for(request: HttpRequest, method: HttpRequestConfigurations): RequestInit {
        return {
            cache: request.cache,
            mode: request.mode,
            credentials: request.credentials,
            headers: request.headers,
            redirect: request.redirect,
            referrer: request.referrer,
            method: method,
            body: this.formatBody(request, method)
        };
    }

    private static formatBody(request: HttpRequest, method: HttpRequestConfigurations): any {
        if (method === HttpRequestConfigurations.GET || !request.body) {
            return null;
        }

        if (request.body?.constructor === Object) {
            return JSON.stringify(request.body);
        }

        return request.body;
    }
}
