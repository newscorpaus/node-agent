import { RequestAPI, CoreOptions, RequiredUriUrl, Request } from "request";

export interface AgentResponse {
    url: string;
    status: number;
    headers: { [key: string]: string };
    body: string;
}

export interface Agent {
    (url: string, headers: any, cb: (error: Error | undefined, result: AgentResponse) => void): void;
}

export function agent(agent?: RequestAPI<Request, CoreOptions, RequiredUriUrl>): Agent;
