import { z} from 'zod'
const userSchemaRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean().optional(),
})

const userSchemaResponse = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    admin: z.boolean(),
    active: z.boolean()
})

const userSchemaPatch = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    admin: z.boolean().optional(),
    active: z.boolean().optional(),
})
export {userSchemaRequest, userSchemaResponse, userSchemaPatch}