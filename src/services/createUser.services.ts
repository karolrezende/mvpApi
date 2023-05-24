import { AppError } from "../errors";
import { IuserResponse } from "../interfaces/createUser.interface";

const createUser = async (userBody:IuserResponse): Promise<IuserResponse> =>{
  return userBody
}

export {createUser}