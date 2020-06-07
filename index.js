'use strict';

const http = require('http');
const METHODS = http.METHODS;

function Method(method) {

    method = method.toUpperCase();
    if (!METHODS.includes(method))
        throw TypeError('Invalid HTTP method!');

    async function match(ctx, next) {
        await next(ctx.req.method === method);
    }

    return match;
}

module.exports = Method;
