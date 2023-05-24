import { Request, Response } from "express";
import { IuseRequest } from "../interfaces/createUser.interface";

const createUser = async (req: Request, res: Response): Promise<Response> =>{
    const userRequest: IuseRequest = req.body
    const newUser = await createUser(userRequest)
    return res.status(201).json(newUser)
}