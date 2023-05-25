import { infer } from "zod"
import { userSchemaPatch, userSchemaRequest, userSchemaResponse } from "../schemas/user.schema"
import {z} from 'zod'

type IuserRequest = z.infer<typeof userSchemaRequest>
type IuserResponse = z.infer<typeof userSchemaResponse>

interface iUser {
    id: number,
    name: string,
    email: string,
    password: string,
    admin: boolean,
    active: boolean
}
type IuserPatch = z.infer<typeof userSchemaPatch>
export {IuserRequest, IuserResponse, iUser, IuserPatch}