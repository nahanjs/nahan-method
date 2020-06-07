'use strict';

const http = require('http');
const request = require('supertest');
const expect = require('chai').expect;
const { Pipeline, Branch } = require('nahan-onion');
const Method = require('..');

describe('nahan-method', () => {

    describe('Branch(Method(), ...)', () => {

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

        const server = http.createServer((req, res) => app({ req, res }));

        const agent = request.agent(server);

        it('Method (GET)', done => { agent.get('/').expect('Method (GET): GET', done) });
        it('Method (put)', done => { agent.put('/').expect('Method (put): PUT', done) });
        it('Method (POST)', done => { agent.post('/').expect('Method (other): POST', done) });
    });

    describe('Error handler', () => {
        it('Unsupported method', () => {
            const Method_nahan = Method.bind(null, 'nahan');
            expect(Method_nahan).to.throw(TypeError);
            expect(Method_nahan).to.throw('Invalid HTTP method!');
        });
    });
});
