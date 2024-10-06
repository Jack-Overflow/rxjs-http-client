import {HttpRequestConfigurations} from '../types/http-configurations.enum';
import {HttpRequest} from '../types/http-request.class';

const ContentTypeApplicationForm = 'application/x-www-form-urlencoded';
const ContentTypeMultipartForm = 'multipart/form-data';

function isFormContent(request: HttpRequest):boolean{
    const headers = request.headers;
    if ( !headers.hasOwnProperty('Content-Type')){
        return false;
    }
    const contentType = headers['Content-Type'];
    if (!contentType) {
        return false;
    }  
    return contentType.includes(ContentTypeApplicationForm) || contentType.includes(ContentTypeMultipartForm);
}

function formatBody(request: HttpRequest,method: HttpRequestConfigurations):any{
    
    if ( isFormContent(request)){
        return request.body;
    } 
    //continue  RESTFul call
    const body = method !== HttpRequestConfigurations.GET ? JSON.stringify(request.body) : null;
    return body;
}
export class RequestMapper {
    public static for(request: HttpRequest, method: HttpRequestConfigurations): RequestInit {
        const result = {
            cache: request.cache,
            mode: request.mode,
            credentials: request.credentials,
            headers: request.headers,
            redirect: request.redirect,
            referrer: request.referrer,
            method: method,
           // body: method !== HttpRequestConfigurations.GET ? JSON.stringify(request.body) : null
           body: formatBody(request,method)
        };
        return result;
    }
}
