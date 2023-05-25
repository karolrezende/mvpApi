import { QueryConfig, QueryResult } from "pg"
import { AppError } from "../errors"
import { IuserResponse } from "../interfaces/createUser.interface"
import { client } from "../database"

export const putUser = async (id: number, isAdm: string, email: string): Promise<IuserResponse> => {
    const querySelectString = `
    SELECT id, email, active
    FROM
        users
    WHERE 
        id = $1;
    ` 
    const querySelectConfig = {
        text: querySelectString,
        values: [id]
    }
    const querySelectResult: QueryResult = await client.query(querySelectConfig)

    if(isAdm === 'false' && querySelectResult.rows[0].email !== email){
        throw new AppError("Insufficient Permission", 403)
    }
    if(querySelectResult.rows[0].active){
        throw new AppError("User is already active", 400)
    }

    const queryString: string = `
        UPDATE
            users
        SET active = $1
        WHERE id = $2
        RETURNING id, name, email, admin, active;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [true, querySelectResult.rows[0].id]
    }
    const queryResult:QueryResult<IuserResponse> = await client.query(queryConfig)

    return queryResult.rows[0]
}