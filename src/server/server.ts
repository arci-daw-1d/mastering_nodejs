import { createServer } from "node:http";
import express, { Express} from "express";
import { testHandler } from "./testHandler";
import httpProxy from "http-proxy";
import helmet from "helmet";

const port = process.env.PORT||5000;

const expressApp : Express = express();

const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5100", ws: true,
});

// expressApp.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             imgSrc: "self",
//             scriptSrc: ['self', 'unsafe-eval', 'unsafe-inline'],
//             // scriptSrcAlt: "none",
//             connectSrc: "'self' ws://localhost:5000",
//         }
//     }
// }));

//    <meta http-equiv="Content-Security-Policy"
//    content="script-src 'self' 'unsafe-eval' 'unsafe-inline';
//    object-src 'self';
//    style-src 'self' 'unsafe-inline';
//    media-src *">
expressApp.use(express.json());

expressApp.post("/test", testHandler);
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist/"));
expressApp.use(express.static("dist/client"));
expressApp.use((res, req) => proxy.web(res, req));


const server = createServer(expressApp);

server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, ()=> {
    console.log(`Server listening at port ${port}`);
});