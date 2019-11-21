import {Observable} from "rxjs";

export interface IHttpResponse {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer: Observable<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    arrayBuffer(): Observable<ArrayBuffer>;
    blob(): Observable<Blob>;
    formData(): Observable<FormData>;
    json(): Observable<any>;
    text(): Observable<string>;
}
