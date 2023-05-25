import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureAdm = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> =>{
    if(res.locals.isAdm === "false"){
        throw new AppError("Insufficient Permission", 403)
    }
    return next()
}