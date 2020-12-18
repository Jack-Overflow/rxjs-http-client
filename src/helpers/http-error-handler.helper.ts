import {HttpResponse} from "../types/http-response.class";

export abstract class HttpErrorHandler {
    public static throwIfNotOkResponse(response: HttpResponse): void {
        if (!response.ok) {
            throw response;
        }
    }
}