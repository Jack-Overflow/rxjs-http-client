import {fromPromise} from 'rxjs/internal-compatibility';
import {IHttpResponse} from "../types/http-response.interface";

export class ResponseMapper {
    public static map(response: Response): IHttpResponse {
        return {
            headers: response.headers,
            ok: response.ok,
            redirected: response.redirected,
            status: response.status,
            statusText: response.statusText,
            trailer: fromPromise(response.trailer),
            type: response.type,
            url: response.url,
            arrayBuffer: () => fromPromise(response.arrayBuffer()),
            blob: () => fromPromise(response.blob()),
            formData: () => fromPromise(response.formData()),
            json: () => fromPromise(response.json()),
            text: () => fromPromise(response.text())
        }
    }
}
