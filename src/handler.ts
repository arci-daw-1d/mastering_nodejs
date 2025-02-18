import { IncomingMessage, ServerResponse } from "node:http";

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    res.end("Hello world");
};