import { Request, Response } from "express";

export const readHandler = (req: Request, resp: Response) => {
    resp.json({message:"Hello world"});
    // resp.cookie("sessionID", "mysecretcode");
    // req.pipe(resp);
};