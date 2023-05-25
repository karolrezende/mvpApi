import { QueryResult } from "pg";
import { iUser } from "../interfaces/createUser.interface";
import { client } from "../database";

export const getUser = async (): Promise<Array<iUser>> =>{
    const queryString: string = `
        SELECT id, name, email
        FROM users;
    `
    const queryResult: QueryResult<iUser>= await client.query(queryString)

    return queryResult.rows
}