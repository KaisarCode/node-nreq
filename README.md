# HTTP Request
[nodejs] JSON HTTP Requests.

### Install
```
npm install kc-nreq
```

### Use
```js
var data = { a: 1, b: 2 };
nreq('POST', 'https://mypage.com', data, function(res, status){
    console.log(res);
    console.log(status);
});
```
