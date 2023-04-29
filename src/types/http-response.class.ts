import {from, Observable} from 'rxjs';

export class HttpResponse {
    private readonly _rawBody: BodyInit;
    private readonly _response: Response;

    constructor(body: BodyInit, options: ResponseInit) {
        if (typeof body === 'object') {
            body = JSON.stringify(body);
        }
        this._rawBody = body;
        this._response = new Response(body, options);
    }

    public get headers(): Headers {
        return this._response.headers;
    }

    public get ok(): boolean {
        return this._response.ok;
    }

    public get redirected(): boolean {
        return this._response.redirected;
    }

    public get status(): number {
        return this._response.status;
    }

    public get statusText(): string {
        return this._response.statusText;
    }

    public get type(): string {
        return this._response.type;
    }

    public get url(): string {
        return this._response.url;
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
        return new HttpResponse(this._rawBody, {
            headers: this.headers,
            status: this.status,
            statusText: this.statusText
        });
    }
}
