import {from, Observable} from 'rxjs';

export class HttpResponse {
    public headers: Headers;
    public ok: boolean;
    public redirected: boolean;
    public status: number;
    public statusText: string;
    public type: ResponseType;
    public url: string;

    private readonly _response: Response;

    constructor(response: Response) {
        this._response = response;
        this.headers = response.headers;
        this.ok = response.ok;
        this.redirected = response.redirected;
        this.status = response.status;
        this.statusText = response.statusText;
        this.type = response.type;
        this.url = response.url;
    }

    public arrayBuffer(): Observable<ArrayBuffer> {
        return from(this._response.arrayBuffer());
    }

    public blob(): Observable<Blob> {
        return from(this._response.blob());
    }

    public formData(): Observable<FormData> {
        return from(this._response.formData());
    }

    public json(): Observable<any> {
        return from(this._response.json());
    }

    public text(): Observable<string> {
        return from(this._response.text());
    }

    public clone(): HttpResponse {
        return new HttpResponse(this._response.clone());
    }
}
