import { userLoginRequest, userToken } from "../schemas/login.schema"
import {z} from 'zod'
export type IuserLogin = z.infer<typeof userLoginRequest>
export type IuserToken = z.infer<typeof userToken>