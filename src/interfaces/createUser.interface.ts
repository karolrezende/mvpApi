import { infer } from "zod"
import { userSchemaRequest, userSchemaResponse } from "../schemas/user.schema"
import {z} from 'zod'

type IuserRequest = z.infer<typeof userSchemaRequest>
type IuserResponse = z.infer<typeof userSchemaResponse>

export {IuserRequest, IuserResponse}