import { createServer } from "node:http";
import express, { Express} from "express";
import httpProxy from "http-proxy";
import helmet from "helmet";
import { engine } from "express-handlebars";
import * as helpers from "./template_helpers"
import { registerFormMiddleware, registerFormRoutes } from "./forms";

const port = process.env.PORT||5000;

const expressApp : Express = express();

const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5100", ws: true,
});

expressApp.set("views", "templates/server");
expressApp.engine("handlebars", engine());
expressApp.set("view engine", "handlebars");

expressApp.use(helmet());
expressApp.use(express.json());

registerFormMiddleware(expressApp);
registerFormRoutes(expressApp);

expressApp.use("^/$", (req, resp) => { resp.redirect("/form")});

expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist/"));
expressApp.use(express.static("dist/client"));
expressApp.use((res, req) => proxy.web(res, req));


const server = createServer(expressApp);

server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, ()=> {
    console.log(`Server listening at port ${port}`);
});