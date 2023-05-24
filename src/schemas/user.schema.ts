import {boolean, z} from 'zod'
const userSchemaRequest = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    admin: z.boolean(),
    active: z.boolean()
}).required()

const userSchemaResponse = userSchemaRequest.omit({password: true})
export {userSchemaRequest, userSchemaResponse}