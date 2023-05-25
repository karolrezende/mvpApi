import { Request, Response } from "express";
import { IuserPatch, IuserRequest } from "../interfaces/createUser.interface";
import { createUser } from "../services/createUser.services";
import { getUser } from "../services/getUser.services";
import { getUserId } from "../services/getUserId.services";
import { IuserToken } from "../interfaces/loginUser.interface";


export const createUserController = async (req: Request, res: Response): Promise<Response> =>{
    const userRequest: IuserRequest = req.body
    const newUser = await createUser(userRequest)
    return res.status(201).json(newUser)
}

export const getUserController = async (req:Request, res:Response): Promise<Response> =>{
    const getUserRes = await getUser()
    return res.status(200).json(getUserRes)
}

export const getUserIdController = async (req:Request, res: Response): Promise<Response> =>{
    const email: string = res.locals.email
    const getUserRes = await getUserId(email)
    return res.status(200).json(getUserRes)
}

export const patchUser = async (req: Request, res: Response): Promise<Response> => {
    const userBody = req.body
    const token = res.locals.isAdm
    const email = res.locals.isAdm
    const patchUserRes = patchUser(userBody, token, email)
    return res.status(200).json(patchUserRes)
}