//neste ambiente apenas faço a inicialização dos endpoints
import 'express-async-errors'
import express, { Application, Router, json } from 'express'
import { handleErrors } from './errors'
import { useRouter } from './routers/routes'
const app: Application = express()
app.use(json())



app.use('/users', useRouter)
app.use('/login', useRouter)

app.use(handleErrors)

export default app

