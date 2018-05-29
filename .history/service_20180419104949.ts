/**
 * Created by drapal on 18/12/17.
 */
declare var Promise:any;

var request = require('request');

module APIService {

    export function post(body: any, url: string, requestInfo: any,customHeaders?:any) {

        var resolve: any, reject: any;
        var promise = new Promise(function (res: any, rej: any) {
            resolve = res;
            reject = rej;
        });
        
        request.post({
            headers: buildHeaders(customHeaders,requestInfo),
            url: url,
            body: JSON.stringify(body)
        }, function (error: any, response: any) {

            if (error) {
                reject(error);
                return;
            }

            try{
                resolve(JSON.parse(response.body));
            }catch(e){
                console.error("Error in parsing response body: " + JSON.stringify(response));
                reject(e);
            }

        });

        return promise;
    };

    function buildHeaders(customHeaders:any,requestInfo:any):any{
        let headers:any = {
                'content-type': 'application/json',
                'authToken': requestInfo.JWTToken,
                'requestInfo': requestInfo ? JSON.stringify(requestInfo) : null
            }
        if(customHeaders){
            for (const key of Object.keys(customHeaders)) {
                    headers[key] = customHeaders[key];
            }
        }
        return headers;
    }

    export function get(body: any, url: string, requestInfo: any,customHeaders?:any) {

        var resolve: any, reject:any;
        var promise = new Promise(function (res:any, rej:any) {
            resolve = res;
            reject = rej;
        });

        request.get({
            headers: buildHeaders(customHeaders,requestInfo),
            url: url
        }, function (error:any, response:any) {
            if (error) {
                reject(error);
                return;
            }

            try{
                resolve(JSON.parse(response.body));
            }catch(e){
                console.error("Error in parsing response body: " + JSON.stringify(response));
                reject(e);
            }

        });

        return promise;
    };
}