import { expect } from 'chai';
import { _agent } from '../src/';
import { Writable } from 'stream';
import * as request from 'request';
import 'mocha';

const fakeWritable = () => {
    const fakeWritable = new Writable();
    fakeWritable._write = (chunk, encoding, cb) => {
        cb();
    };

    const writable = <Writable>fakeWritable;
    return writable;
};

describe('capi v2 agent', () => {
    it('proxies a v2 content call to CAPI', (done) => {
        const fn: (options: (request.CoreOptions & request.UriOptions), callback?: request.RequestCallback) => any =
            function(options: (request.CoreOptions & request.UriOptions), cb?: request.RequestCallback) {
                expect(options.uri).to.equal('http://api.newsapi.com.au/content/v2/capi-id-xyz');
                done();
                return <request.Request>{};
            };

        const fakeRequester = <request.RequestAPI<request.Request, request.CoreOptions, {}>>fn;

        const agent = _agent(fakeRequester);

        agent('http', '/api.newsapi.com.au/content/v2/capi-id-xyz', { 'Accept-Encoding': 'gzip' }, fakeWritable(), (err: Error, result: any) => {});
    });

    it('uses the indicated protocol', (done) => {
        const fn: (options: (request.CoreOptions & request.UriOptions), callback?: request.RequestCallback) => any =
            function(options: (request.CoreOptions & request.UriOptions), cb?: request.RequestCallback) {
                expect(options.uri).to.match(/https\:\/\//);
                done();
                return <request.Request>{};
            };

        const fakeRequester = <request.RequestAPI<request.Request, request.CoreOptions, {}>>fn;

        const agent = _agent(fakeRequester);
        agent('https', '/api.newsapi.com.au/content/v2/capi-id-xyz', { 'Accept-Encoding': 'gzip' }, fakeWritable(), (err: Error) => {});
    });

    describe('error conditions', () => {
        it('uses the callback if an error occurs in the request', (done) => {
            // const scope = nockReplyWithError('http://api.newsapi.com.au/content/v2', { message: 'BOOM', name: 'BoomError' });

            const fn: (options: (request.CoreOptions & request.UriOptions), callback?: request.RequestCallback) => any =
                function(options: (request.CoreOptions & request.UriOptions), cb?: request.RequestCallback) {
                    return cb({ message: 'BOOM', name: 'BoomError' }, undefined, undefined);
                };

            const fakeRequester = <request.RequestAPI<request.Request, request.CoreOptions, {}>>fn;

            const agent = _agent(fakeRequester);

            agent('http', '/api.newsapi.com.au/content/v2/capi-id-xyz', { 'Accept-Encoding': 'gzip' }, fakeWritable(), (err: Error, res: any) => {
                expect(err.message).to.equal('BOOM');
                expect(err.name).to.equal('BoomError');
                done();
            });
        });
    });
});
