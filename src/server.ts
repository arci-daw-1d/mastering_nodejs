import { createServer } from "node:http";
import { handler } from "./handler";

const port = process.env.PORT||5000;
const server = createServer(handler);

server.listen(port, function (){
    console.log(`Server listening at port ${port}`);
});