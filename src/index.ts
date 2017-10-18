/**
 * A streaming agent that takes a Writable stream from the outside (presumably for a HTTPResponse)
 * and streams an upstream response into it.
 */

import { Writable } from 'stream';
import { omit } from 'ramda';
import { Url } from 'url';
import * as _request from 'request';
import { UrlOptions } from 'request';

const _agent = (requester: _request.RequestAPI<_request.Request, _request.CoreOptions, _request.RequiredUriUrl> = _request) => {
    return function (url: string, headers: any, writable: Writable, cb: ((error?: Error, result?: any) => void)): void {
        const headersCopy = omit(['host'], headers);

        const options = {
            method: 'GET',
            headers: headersCopy,
            url: url,
            gzip: true
        };

        requester(options, (err: Error, res: any) => {
            if (err) {
                cb(err, res);
            } else {
                cb(undefined, res);
            }
        }).pipe(writable);
    };
};

export { _agent };
