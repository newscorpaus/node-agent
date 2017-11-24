import { expect } from 'chai';
import { agent as initialize } from '../src/';
import * as request from 'request';
import 'mocha';

describe('capi v2 agent', () => {
    it('proxies a v2 content call to CAPI', (done) => {
        const fn: (options: (request.CoreOptions & request.UrlOptions), callback?: request.RequestCallback) => any =
            function(options: (request.CoreOptions & request.UrlOptions), cb?: request.RequestCallback) {
                expect(options.url).to.equal('http://api.newsapi.com.au/content/v2/capi-id-xyz');
                done();
                return <request.Request>{};
            };

        const fakeRequester = <request.RequestAPI<request.Request, request.CoreOptions, {}>>fn;

        const agent = initialize(fakeRequester);

        agent('http://api.newsapi.com.au/content/v2/capi-id-xyz', { 'Accept-Encoding': 'gzip' }, (err: Error, result: any) => {});
    });

    it('uses the indicated protocol', (done) => {
        const fn: (options: (request.CoreOptions & request.UrlOptions), callback?: request.RequestCallback) => any =
            function(options: (request.CoreOptions & request.UrlOptions), cb?: request.RequestCallback) {
                expect(options.url).to.match(/https\:\/\//);
                done();
                return <request.Request>{};
            };

        const fakeRequester = <request.RequestAPI<request.Request, request.CoreOptions, {}>>fn;

        const agent = initialize(fakeRequester);
        agent('https://api.newsapi.com.au/content/v2/capi-id-xyz', { 'Accept-Encoding': 'gzip' }, (err: Error) => {});
    });

    describe('error conditions', () => {
        it('uses the callback if an error occurs in the request', (done) => {
            const fn: (options: (request.CoreOptions & request.UrlOptions), callback?: request.RequestCallback) => any =
                function(options: (request.CoreOptions & request.UrlOptions), cb?: request.RequestCallback) {
                    return cb({ message: 'BOOM', name: 'BoomError' }, undefined, undefined);
                };

            const fakeRequester = <request.RequestAPI<request.Request, request.CoreOptions, {}>>fn;

            const agent = initialize(fakeRequester);

            agent('http://api.newsapi.com.au/content/v2/capi-id-xyz', { 'Accept-Encoding': 'gzip' }, (err: Error, res: any) => {
                expect(err.message).to.equal('BOOM');
                expect(err.name).to.equal('BoomError');
                done();
            });
        });
    });
});
