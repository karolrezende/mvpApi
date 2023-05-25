import format from "pg-format"
import {IuserPatch, IuserResponse } from "../interfaces/createUser.interface"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../database"
import { AppError } from "../errors"

interface iPatchProps {
    userBody: IuserPatch,
    token: string,
    email: string

}
export const patchUser = async ({userBody, token, email}: iPatchProps): Promise<IuserPatch> => {
    const querySelectString = `
        SELECT email 
        FROM
            users
        WHERE 
            email = $1;
    `
    const querySelectConfig = {
        text: querySelectString,
        values: [email]
    }
    const querySelectResult: QueryResult = await client.query(querySelectConfig)

    if(token === 'false' && querySelectResult.rows[0].email !== email){
        throw new AppError("Insufficient Permission", 403)
    }

    const queryString = format(`
        UPDATE
            users
        SET (%I) = ROW(%L)
        WHERE email = $1
        RETURNING id, name, email, active;
    `,
    Object.keys(userBody),
    Object.values(userBody)
    )
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    }
    const queryResult: QueryResult<IuserPatch> = await client.query(queryConfig)

    return queryResult.rows[0]
}