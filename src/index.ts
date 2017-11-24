import * as defaultRequest from 'request';

const agent = (request: defaultRequest.RequestAPI<defaultRequest.Request, defaultRequest.CoreOptions, defaultRequest.RequiredUriUrl> = defaultRequest): any => {
    return function (url: string, headers: any, cb: (error: Error, result: any) => void): void {
        const options = {
            method: 'GET',
            headers: headers,
            url: url,
            gzip: true
        };

        request(options, (err: Error, res: any) => {
            if (err) {
                cb(err, undefined);
            } else {
                cb(undefined, {
                    url: url,
                    status: res.statusCode,
                    headers: res.headers,
                    body: res.body
                });
            }
        });
    };
};

export { agent };