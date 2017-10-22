/// <reference types='node' />

import * as request from 'request';

export interface Agent {
    (url: string, headers: any, writable: NodeJS.WritableStream, cb: ((error?: Error, result?: any) => void)): void;
}

export function _agent(agent?: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>): Agent;
