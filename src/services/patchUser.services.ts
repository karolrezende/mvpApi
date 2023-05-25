import format from "pg-format"
import {IuserPatch, IuserResponse } from "../interfaces/createUser.interface"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../database"
import { AppError } from "../errors"

export const patchUser = async (userBody: IuserPatch, isAdm:string, email:string, id: number): Promise<IuserPatch> => {
    // email: quem pediu
    // isAdm: quem pediu 
    // id: parametroid

    const querySelectString = `
        SELECT id, email
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

    const queryString: string = format(`
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE id = $1
        RETURNING id, name, email, admin, active;
    `,
    Object.keys(userBody),
    Object.values(userBody)
    )
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [querySelectResult.rows[0].id]
    }
    const queryResult: QueryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}