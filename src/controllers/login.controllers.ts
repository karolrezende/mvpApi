import { Request, Response } from "express";
import { IuserLogin, IuserToken } from "../interfaces/loginUser.interface";
import { loginUser } from "../services/loginUser.services";
import { userLoginRequest } from "../schemas/login.schema";

export const loginUserController = async(req:Request, res:Response): Promise<Response> =>{
    const userBody: IuserLogin = userLoginRequest.parse(req.body)
    const userLogged: IuserToken = await loginUser(userBody)

    return res.status(200).json(userLogged)
}