# node-agent

A http(s) agent used generally in DCS projects. 

It functions as a wrapper around the [Request](https://github.com/request/request) npm, supporting a writable stream and executing the supplied callback with a copy of the result when the stream is finished.
