# RxJS-Http-Client

A simple to use http client built on ES6 fetch and RxJS.

Version 1.5.4 is the latest stable version.

### Installing RxJS-Http-Client

You can use NPM or Yarn to install this package

```$xslt
yarn add rxjs-http-client
npm i rxjs-http-client
```

### Usage

Using rxjs-http-client is very simple.

To get started you are required to create a new instance of the RxJSHttpClient class as shown below:

```javascript 
    class SomeClass {
        _http;
        
        constructor() {
            this._http = new RxJSHttpClient();
        }
    }
```

### Methods

#### get
The get method provides you with the ability to make a HTTP GET request.

This method has two parameters, the first parameter is the request url and the second optional parameter is the [HTTP config object](#http-config-object).

This method returns an observable container a [HTTP response object](#http-response-object).

Example of basic usage is shown below:

```javascript 
    class SomeClass {
        _http;
            
        constructor() {
            this._http = new RxJSHttpClient();
        }
        
        getRequest() {
            this._http.get('some-url')
                .pipe(
                    mergeMap((response) => response.json())
                )
                .subscribe((response) => {
                    console.log(response)
                })
        }
    }
```

#### post
   The post method provides you with the ability to make a HTTP POST request.
   
   This method has two parameters, the first parameter is the request url and the second parameter is the [HTTP config object](#http-config-object).
   
   This method returns an observable container a [HTTP response object](#http-response-object).
   
   Example of basic usage is shown below:
   
   ```javascript 
       class SomeClass {
           _http;
               
           constructor() {
               this._http = new RxJSHttpClient();
           }
           
           postRequest() {
               const request = {
                   body: {
                       some: 'data'
                   }
               }
               
               this._http.post('some-url', request)
                   .pipe(
                       mergeMap((response) => response.json())
                   )
                   .subscribe((response) => {
                       console.log(response)
                   })
           }
       }
   ```

#### put
The put method provides you with the ability to make a HTTP PUT request.

This method has two parameters, the first parameter is the request url and the second parameter is the [HTTP config object](#http-config-object).

This method returns an observable container a [HTTP response object](#http-response-object).

Example of basic usage is shown below:

```javascript 
    class SomeClass {
        _http;
            
        constructor() {
            this._http = new RxJSHttpClient();
        }
        
        putRequest() {
            const request = {
                body: {
                    some: 'data'
                }
            }
            
            this._http.put('some-url', request)
                .pipe(
                    mergeMap((response) => response.json())
                )
                .subscribe((response) => {
                    console.log(response)
                })
        }
    }
```

#### patch
The patch method provides you with the ability to make a HTTP PATCH request.

This method has two parameters, the first parameter is the request url and the second parameter is the [HTTP config object](#http-config-object).

This method returns an observable container a [HTTP response object](#http-response-object).

Example of basic usage is shown below:

```javascript 
    class SomeClass {
        _http;
            
        constructor() {
            this._http = new RxJSHttpClient();
        }
        
        patchRequest() {
            const request = {
                body: {
                    some: 'data'
                }
            }
            
            this._http.patch('some-url', request)
                .pipe(
                    mergeMap((response) => response.json())
                )
                .subscribe((response) => {
                    console.log(response)
                })
        }
    }
```

#### delete
The delete method provides you with the ability to make a HTTP DELETE request.

This method has two parameters, the first parameter is the request url and the second parameter is the [HTTP config object](#http-config-object).

This method returns an observable container a [HTTP response object](#http-response-object).

Example of basic usage is shown below:

```javascript 
    class SomeClass {
        _http;
            
        constructor() {
            this._http = new RxJSHttpClient();
        }
        
        deleteRequest() {
            const request = {
                body: {
                    some: 'data'
                }
            }
            
            this._http.delete('some-url', request)
                .pipe(
                    mergeMap((response) => response.json())
                )
                .subscribe((response) => {
                    console.log(response)
                })
        }
    }
```

### Http Config Object
The HTTP Config Object is a interface that is used as the second parameter to all the methods and is only optional on the get method. The Http Config Object contains the following properties that are all optional:

- mode - Contains the mode of the request (e.g., cors, no-cors, same-origin, navigate.)
- cache - Contains the cache mode of the request (e.g., default, reload, no-cache).
- credentials - Contains the credentials of the request (e.g., "omit", "same-origin", "include"). The default is "same-origin".
- headers - Contains the key value pairs (object) of the request headers (default 'Content-Type' header is 'application/json')
- redirect - Contains the mode for how redirects are handled. It may be one of follow, error, or manual.
- referrer - Contains the referrer of the request (e.g., client).
- body - Contains the request body to send in the request
 
### Http Response Object
The HTTP Response Object is a interface that is returned from all of the HTTP client methods. The Http Response Object contains the following properties and methods:
 
- headers - Contains a the standard JS [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) Class
- ok - Contains a boolean stating whether the response was successful (status in the range 200-299) or not.
- redirected - Indicates whether or not the response is the result of a redirect; that is, its URL list has more than one entry.
- status - Contains the status code of the response (e.g., 200 for a success).
- statusText - Contains the status message corresponding to the status code (e.g., OK for 200).
- trailer - Contains a Observable resolving to a Headers object associated with the response with Response.headers for values of the HTTP Trailer header.
- type - Contains the type of the response (e.g., basic, cors).
- url - Contains the URL of the response.
- arrayBuffer() - Takes a Response stream and reads it to completion. It returns a Observable that resolves with an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).
- blob() - Takes a Response stream and reads it to completion. It returns a Observable that resolves with a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
- formData() - Takes a Response stream and reads it to completion. It returns a Observable that resolves with a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
- json() - Takes a Response stream and reads it to completion. It returns a Observable that resolves with the result of parsing the body text as [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).
- text() - Takes a Response stream and reads it to completion. It returns a Observable that resolves with a [USVString](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text).

### Request Interceptors
It is possible to intercept a HTTP request by providing the HTTP client with an array of HTTP request interceptors.
The request interceptors will run in the order they are provided in the array. 

In order for a request interceptor to work correctly it must adhere to the following interface: [IHttpInterceptor](#ihttpinterceptor).

### Response Interceptors
It is possible to intercept a HTTP response by providing the HTTP client with an array of HTTP response interceptors.
The response interceptors will run in the order they are provided in the array. 

In order for a response interceptor to work correctly it must adhere to the following interface: [IHttpInterceptor](#ihttpinterceptor).


#### IHttpInterceptor
The IHttpInterceptor interface is the interface which all HTTP interceptors must adhere to in order to work correctly.
This interface consists of one method, the intercept method.

The intercept method has one parameter that is a [HttpRequest](#http-request-object) if it is a [request interceptor](#request-interceptors) or a [HttpResponse](#http-response-object) if it is a response interceptor.

The intercept method must return a [HttpRequest](#http-request-object) if it is a [request interceptor](#request-interceptors) or a [HttpResponse](#http-response-object) if it is a response interceptor.

An example of a http request interceptor is shown below:
```javascript 
    class ExampleRequestInterceptor {
        intercept(request) {
               const newRequest = request.clone();
               newRequest.headers = {
                   ...request.headers,
                   testing: 'example adding a header to the request',
               };
               return newRequest;
           }
    }
```

An example of a http response interceptor is shown below:
```javascript 
    class ExampleResponseInterceptor {
        intercept(response) {
               const newResponse = response.clone();
               newResponse.status = 404;
               return newResponse;
           }
    }
```

The first optional parameter of the RxjsHttpClient is an array of request interceptors and the second optional parameter is an array of response interceptors.

An example of a http client with just request interceptors is shown below:
```javascript 
    class SomeClass {
        _http;
            
        constructor() {
            this._http = new RxJSHttpClient([
                new ExampleRequestInterceptor()
            ]);
        }
    }
```

An example of a http client with request interceptors and response interceptors is shown below:
```javascript 
    class SomeClass {
        _http;
            
        constructor() {
            this._http = new RxJSHttpClient([
                new ExampleRequestInterceptor()
            ],
            [
                 new ExampleResponseInterceptor()
            ]);
        }
    }
```

An example of a http client with just response interceptors is shown below:
```javascript 
    class SomeClass {
        _http;
            
        constructor() {
            this._http = new RxJSHttpClient([],
            [
                 new ExampleResponseInterceptor()
            ]);
        }
    }
```

After passing interceptors into an instance of an RxjsHttpClient it will be used on all requests from then on but only on that instance.

#### Http Request Object
The HttpRequest class is the fully mapped request that is passed to [request interceptors](#request-interceptors) for modification if required. It contains the following properties that can all be changed:

- url - The URL for the request
- mode - Contains the mode of the request (e.g., cors, no-cors, same-origin, navigate.)
- cache - Contains the cache mode of the request (e.g., default, reload, no-cache).
- credentials - Contains the credentials of the request (e.g., "omit", "same-origin", "include"). The default is "same-origin".
- headers - Contains the key value pairs (object) of the request headers (default 'Content-Type' header is 'application/json')
- redirect - Contains the mode for how redirects are handled. It may be one of follow, error, or manual.
- referrer - Contains the referrer of the request (e.g., client).
- body - Contains the request body to send in the request


# Issues/Requests

I'd like to hear from anyone who finds any bugs/ feature request for this library, go to [The issues page](https://github.com/Jack-Overflow/rxjs-http-client/issues) 
