import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import * as _ from "lodash";

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

    public get trailer(): Observable<Headers> {
        return fromPromise(this._response.trailer);
    };

    public arrayBuffer(): Observable<ArrayBuffer> {
        return fromPromise(this._response.arrayBuffer());
    }

    public blob(): Observable<Blob> {
        return fromPromise(this._response.blob());
    }

    public formData(): Observable<FormData> {
        return fromPromise(this._response.formData());
    }

    public json(): Observable<any> {
        return fromPromise(this._response.json());
    }

    public text(): Observable<string> {
        return fromPromise(this._response.text());
    }

    public clone(): HttpResponse {
        return _.cloneDeep(this);
    }
}
