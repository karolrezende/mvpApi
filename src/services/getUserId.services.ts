import { QueryConfig, QueryResult } from "pg"
import { iUser } from "../interfaces/createUser.interface"
import { client } from "../database"

export const getUserId = async (email: string): Promise<iUser> => {
    const queryString:string = `
        SELECT id, name, email
        FROM 
            users
        WHERE email = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    }
    const queryResult: QueryResult<iUser> = await client.query(queryConfig)

    return queryResult.rows[0]
}