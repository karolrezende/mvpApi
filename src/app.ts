//neste ambiente apenas faço a inicialização dos endpoints
import express, { Application, Router, json } from 'express'

const app: Application = express()
app.use(json())

export const useRouter: Router = Router()

app.use('/users', useRouter)
app.use('/login', useRouter)
export default app

