# node-agent

A http(s) agent used generally in DCS projects. 

It functions as a wrapper around the [Request](https://github.com/request/request) npm, supporting a writable stream and executing the supplied callback with a copy of the result when the stream is finished.

## Installing

Add something like this into your package.json:

  "dependencies": {
    "async": "^2.1.2",
    "node-agent": "git@github.com:newscorpaus/node-agent.git"
  }

## Testing

Currently mocha needs to be a global dependency:

`npm install -g mocha`
