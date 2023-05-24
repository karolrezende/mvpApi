import { QueryResult } from "pg";
import { iUser } from "../interfaces/createUser.interface";
import { client } from "../database";
import { AppError } from "../errors";

export const getUser = async (isAdm: string): Promise<Array<iUser>> =>{
    if(isAdm === "false"){
        throw new AppError("Insufficient Permission", 403)
    }

    const queryString: string = `
        SELECT id, name, email
        FROM users;
    `
    const queryResult: QueryResult<iUser>= await client.query(queryString)

    return queryResult.rows
}