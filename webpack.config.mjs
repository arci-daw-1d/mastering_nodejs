import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: "development",
    entry: "./src/client/client.js",
    // devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist/client"),
        filename: "bundle.js",
    },
    "devServer": {
        port: 5100,
        static: ["./static"], // , "node_modules/bootstrap/dist"
        client: { webSocketURL: "http://localhost:5000/ws" }
    }
}