import {z} from 'zod'
export const userLoginRequest = z.object({
    email: z.string().email(),
    password: z.string()
})

export const userToken = z.object({
    token: z.string()
})