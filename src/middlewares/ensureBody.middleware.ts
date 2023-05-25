import { NextFunction, Request, Response } from "express";
import {ZodTypeAny} from 'zod'

export const ensureBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction)=>{
    const bodyValid = schema.parse(req.body)

    req.body = bodyValid

    return next()
}
