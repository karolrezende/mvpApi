import { Request, Response } from "express";
import { IuserRequest } from "../interfaces/createUser.interface";
import { createUser } from "../services/createUser.services";


const createUserController = async (req: Request, res: Response): Promise<Response> =>{
    const userRequest: IuserRequest = req.body
    const newUser = await createUser(userRequest)
    return res.status(201).json(newUser)
}
export {createUserController}