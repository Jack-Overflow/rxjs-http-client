<h1>Changes!</h1>

Please update to 1.1.8 for latest stable version. 

This now works as an NPM package... I apologise for anyone who's 
downloaded this and found that it just didn't work. This has been rectified.

Code has been reduced :) Less is more. 

More work around using this library with a standard JS project

<h1>RxJS-Http-Client</h1>

<p>A simple to use http client built on ES6 fetch and RxJS</p>

<h3>Installing RxJS-Http-Client</h3>
<p>You can use NPM or Yarn to install this package</p>

```$xslt
yarn add rxjs-http-client
npm i rxjs-http-client
```

<h3>Usage</h3>
<p>Using rxjs-http-client is relatively simple, suppose you're making a get request</p>

```typescript 
    export class SomeClass {
        private _http: HttpClient;
        
        constructor() {
            this._http = new HttpClient();
            
            //because it's built on RxJS, you can open a stream
            this._http.get('some-url')
                .pipe(
                    map((responseItem: any) => // code)
                )
                .subscribe((response: any) => {
                    console.log(response)
                })
        }
    }
```

<h1>Issues/Requests.</h1>
I'd like to hear from anyone who finds any bugs/ feature request for this library, go to [The issues page](https://github.com/Dudecor3/rxjs-http-client/issues) 
