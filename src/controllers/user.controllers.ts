import { Request, Response } from "express";
import { IuserPatch, IuserRequest } from "../interfaces/createUser.interface";
import { createUser } from "../services/createUser.services";
import { getUser } from "../services/getUser.services";
import { getUserId } from "../services/getUserId.services";
import { IuserToken } from "../interfaces/loginUser.interface";
import { patchUser } from "../services/patchUser.services";
import { deleteUser } from "../services/deleteUser.services";
import { putUser } from "../services/putUser.services";


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

export const patchUserController = async (req: Request, res: Response): Promise<Response> => {
    const userBody = req.body
    const isAdm = res.locals.isAdm
    const email = res.locals.email
    const id = Number(req.params.id)
    const patchUserRes = await patchUser(userBody, isAdm, email, id)
    return res.status(200).json(patchUserRes)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id)
    const isAdm: string = res.locals.isAdm
    const email: string = res.locals.email
    await deleteUser(id, isAdm, email)
    return res.sendStatus(204)
}

export const putUserController = async (req: Request, res:Response): Promise<Response> =>{
    const id: number = Number(req.params.id)
    const isAdm: string = res.locals.isAdm
    const email: string = res.locals.email
    const putedUser = await putUser(id, isAdm, email)
    return res.status(200).json(putedUser)
}