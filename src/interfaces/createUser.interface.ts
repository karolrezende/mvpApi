import { infer } from "zod"
import { userSchemaRequest, userSchemaResponse } from "../schemas/user.schema"
import {z} from 'zod'

type IuseRequest = z.infer<typeof userSchemaRequest>
type IuseResponse = z.infer<typeof userSchemaResponse>

export {IuseRequest, IuseResponse}