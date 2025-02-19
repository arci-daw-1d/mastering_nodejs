import { createServer }  from "node:http";
import express from "express";
import cors from "cors";

createServer(
    express().use(cors())
        .use(express.static("static"))
        .post("*", (req, resp) => {
            req.on("data", (data) => {console.log(data.toString())});
            req.on("end", () => resp.end("Hello"));
        })
        .listen(9999,
            () => console.log("Server is running on localhost:9999"))
);