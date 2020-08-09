'use strict';

const http = require('http');
const request = require('supertest');
const expect = require('chai').expect;

const { Pipeline, Branch } = require('nahan-onion');
const Method = require('..');

const app = Pipeline(
    async (ctx, next) => { await next(); ctx.res.end(); },

    Branch(Method('GET'), ctx => ctx.res.write(ctx.req.method)),
    Branch(Method(new String('post')), ctx => ctx.res.write(ctx.req.method)),
    Branch(Method(['put', new String('PoSt')]), ctx => ctx.res.write(ctx.req.method)),
);

const server = http.createServer((req, res) => app({ req, res }));
const agent = request.agent(server);

describe('Method', () => {

    it("Method('GET')", done => { agent.get('/').expect('GET', done); });
    it("Method(new String('post'))", done => { agent.put('/').expect('PUT', done); });
    it("Method(['put', new String('PoSt')])", done => { agent.put('/').expect('PUT', done); });

    it('Invalid type', () => {
        const MethodErr = Method.bind(null, 123);
        expect(MethodErr).to.throw(TypeError);
        expect(MethodErr).to.throw('Invalid type!');
    })

    it('Invalid method', () => {
        const MethodErr = Method.bind(null, 'Wrong');
        expect(MethodErr).to.throw(TypeError);
        expect(MethodErr).to.throw('Invalid HTTP method!');
    });
});
