"use strict";
exports.__esModule = true;
var request = require('request');
var APIService;
(function (APIService) {
    function post(body, url, requestInfo, customHeaders) {
        var resolve, reject;
        var promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        request.post({
            headers: buildHeaders(customHeaders, requestInfo),
            url: url,
            body: JSON.stringify(body)
        }, function (error, response) {
            if (error) {
                reject(error);
                return;
            }
            try {
                resolve(JSON.parse(response.body));
            }
            catch (e) {
                console.error("Error in parsing response body: " + JSON.stringify(response));
                reject(e);
            }
        });
        return promise;
    }
    APIService.post = post;
    ;
    function buildHeaders(customHeaders, requestInfo) {
        var headers = {
            'content-type': 'application/json',
            'authToken': requestInfo.JWTToken,
            'requestInfo': requestInfo ? JSON.stringify(requestInfo) : null
        };
        if (customHeaders) {
            for (var _i = 0, _a = Object.keys(customHeaders); _i < _a.length; _i++) {
                var key = _a[_i];
                headers[key] = customHeaders[key];
            }
        }
        return headers;
    }
    function get(body, url, requestInfo, customHeaders) {
        var resolve, reject;
        var promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        request.get({
            headers: buildHeaders(customHeaders, requestInfo),
            url: url
        }, function (error, response) {
            if (error) {
                reject(error);
                return;
            }
            try {
                resolve(JSON.parse(response.body));
            }
            catch (e) {
                console.error("Error in parsing response body: " + JSON.stringify(response));
                reject(e);
            }
        });
        return promise;
    }
    APIService.get = get;
    ;
})(APIService || (APIService = {}));
exports["default"] = APIService;
