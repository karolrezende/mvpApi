import { Request, Response } from "express";
import { IuserRequest } from "../interfaces/createUser.interface";
import { createUser } from "../services/createUser.services";
import { getUser } from "../services/getUser.services";
import { AppError } from "../errors";


export const createUserController = async (req: Request, res: Response): Promise<Response> =>{
    const userRequest: IuserRequest = req.body
    const newUser = await createUser(userRequest)
    return res.status(201).json(newUser)
}

export const getUserController = async (req:Request, res:Response): Promise<Response> =>{
    const getUserRes = await getUser(res.locals.isAdm)
    return res.status(200).json(getUserRes)
}