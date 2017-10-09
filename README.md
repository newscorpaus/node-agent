# node-agent

A http(s) agent used generally in DCS projects. 

It functions as a wrapper around the [Request](https://github.com/request/request) npm, supporting a writable stream and executing the supplied callback with a copy of the result when the stream is finished.

## Installing

Add something like this into your package.json:

```
  "dependencies": {
    "async": "^2.1.2",
    "node-agent": "git@github.com:newscorpaus/node-agent.git"
  }
```

## Using

The agent uses a factory pattern, which means it exports a factory function that can be called without arguments to deliver a working agent.


```
import { _agent } from '../agent';

const agent = _agent();

agent(req.protocol, req.url, req.headers, res, (err: Error, result: any) => {});

```

The factory can also accept an alternate version of the default Request library.

## Testing

Currently mocha needs to be a global dependency:

`npm install -g mocha`

An agent requires a version of the Request library [Request](https://github.com/request/request) to be passed into it, or something satisfying the typing contract of it.

```
const fakeRequester = <request.RequestAPI<request.Request, request.CoreOptions, {}>>fn;

const agent = _agent(fakeRequester);
```

More Node examples coming.
