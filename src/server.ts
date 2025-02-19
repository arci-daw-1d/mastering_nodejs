import { createServer } from "node:http";
import { readHandler } from "./readHandler";
import express, { Express} from "express";
import cors from "cors";
import helmet from "helmet";

const port = process.env.PORT||5000;

const expressApp : Express = express();

// expressApp.use((req, resp, next) => {
//     resp.setHeader("Content-Security-Policy", "img-src 'self'");
//     next();
// });

expressApp.use(helmet({
    contentSecurityPolicy: {
        directives: {
            imgSrc: "self",
            scriptSrc: "self",
            scriptSrcAlt: "none",
            connectSrc: "'self' ws://localhost:5000",
        }
    }
}));

expressApp.use(cors({origin: "http://localhost:5100"}));

expressApp.use(express.json());

expressApp.post("/read", readHandler);
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist/"));
expressApp.use(express.static("dist/client"));


const server = createServer(expressApp);

server.listen(port, ()=> {
    console.log(`Server listening at port ${port}`);
});