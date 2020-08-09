'use strict';

const http = require('http');
const METHODS = http.METHODS;

function Method(methods) {

    if ((typeof methods === 'string') || (methods instanceof String))
        methods = [methods]

    if (!Array.isArray(methods))
        throw TypeError('Invalid type!');

    for (let i = 0, len = methods.length; i < len; i++) {
        methods[i] = methods[i].toUpperCase()
        if (!METHODS.includes(methods[i]))
            throw TypeError('Invalid HTTP method!');
    }

    function match(ctx, next) {
        if (methods.includes(ctx.req.method))
            return next();
    }

    return match;
}

module.exports = Method;
