import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../errors";
import { IuserLogin, IuserToken } from "../interfaces/loginUser.interface";
import { client } from "../database";
import * as bcript from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { iUser } from "../interfaces/createUser.interface";
export const loginUser = async(userBody: IuserLogin): Promise<IuserToken> => {
    const queryString: string = `
        SELECT * 
        FROM 
            users
        WHERE email = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userBody.email]
    }
    const queryResult: QueryResult<iUser> = await client.query(queryConfig)

    if(queryResult.rowCount ===0){
        throw new AppError("Wrong email/password", 401)
    }

    if(!queryResult.rows[0].active){
        throw new AppError("Wrong email/password", 401)
    }
    const validPassword: boolean = await bcript.compare(userBody.password, queryResult.rows[0].password)

    if(!validPassword){
        throw new AppError("Wrong email/password", 401)
    }

    const token: string = jwt.sign({
        email: queryResult.rows[0].email.toString()
    }, process.env.SECRET_KEY!, {
        expiresIn: process.env.EXPIRES_IN,
        subject: queryResult.rows[0].admin.toString()
    })

    return {token}
}