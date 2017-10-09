/**
 * A streaming agent that takes a Writable stream from the outside (presumably for a HTTPResponse)
 * and streams an upstream response into it.
 */

import { Writable } from 'stream';
import { omit } from 'ramda';
import * as _request from 'request';

const _agent = (requester = _request) => {
    return function (protocol: string, url: string, headers: any, writable: Writable, cb: ((error?: Error, result?: any) => void)): void {
        const headersCopy = omit(['host'], headers);

        // remove the leading '/'
        const uri = `${ protocol }://${ url.substr(1) }`;

        // Express request.protocol looks like 'http:'. The request lib requires 'http' (no colon).
        const requestProtocol = `${ protocol }:`;

        const options = {
            method: 'GET',
            headers: headersCopy,
            uri: uri,
            gzip: true,
            protocol: requestProtocol
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
