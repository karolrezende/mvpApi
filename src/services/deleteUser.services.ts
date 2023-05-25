import { QueryConfig, QueryResult } from "pg"
import { client } from "../database"
import { AppError } from "../errors"
import format from "pg-format"

export const deleteUser = async (id:number, isAdm: string, email:string): Promise<void> =>{
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
    console.log(typeof(querySelectResult.rows[0].active))

    if(!querySelectResult.rows[0].active){
        throw new AppError("User is already not active", 400)
    }

    const queryString: string = `
        UPDATE
            users
        SET active = $1
        WHERE id = $2;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [false, querySelectResult.rows[0].id]
    }
    await client.query(queryConfig)
}