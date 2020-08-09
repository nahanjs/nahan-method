# nahan-method

Method middleware for nahan

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-ci-image]][travis-ci-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/nahan-method.svg
[npm-url]: https://www.npmjs.com/package/nahan-method
[travis-ci-image]: https://travis-ci.org/nahanjs/nahan-method.svg?branch=master
[travis-ci-url]: https://travis-ci.org/nahanjs/nahan-method
[coveralls-image]: https://coveralls.io/repos/github/nahanjs/nahan-method/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/nahanjs/nahan-method?branch=master

# Example

``` javascript
const http = require('http');
const { Pipeline, Branch } = require('nahan-onion');
const Method = require('nahan-method');

const app =
    Pipeline(
        async (ctx, next) => {
            await next();
            ctx.res.end();
        },
        Branch(
            Method('GET'),
            async ctx => ctx.res.write('Method (GET): ' + ctx.req.method)
        ),
        Branch(
            Method('put'),
            async ctx => ctx.res.write('Method (put): ' + ctx.req.method)
        ),
        async ctx => ctx.res.write('Method (other): ' + ctx.req.method)
    );

http.createServer((req, res) => app({ req, res })).listen(3000);
```
