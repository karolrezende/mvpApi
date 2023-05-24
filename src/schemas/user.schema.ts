import { z} from 'zod'
const userSchemaRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean().optional(),
    active: z.boolean().optional()
})

const userSchemaResponse = userSchemaRequest.omit({password: true, active: true})
export {userSchemaRequest, userSchemaResponse}