import format from "pg-format";
import { AppError } from "../errors";
import { IuserRequest, IuserResponse } from "../interfaces/createUser.interface";
import { QueryResult } from "pg";
import { client } from "../database";
import { userSchemaResponse } from "../schemas/user.schema";
import * as bcrypt from 'bcryptjs'
const createUser = async (userBody:IuserRequest): Promise<IuserResponse> =>{
  userBody.password = await bcrypt.hash(userBody.password, 10)
  const queryString = format(`
    INSERT INTO 
      users (%I)
    VALUES
      (%L)
    RETURNING *;
  `,
  Object.keys(userBody),
  Object.values(userBody)
  )

  const queryResult: QueryResult<IuserResponse> = await client.query(queryString)

  return userSchemaResponse.parse(queryResult.rows[0])
}

export {createUser}