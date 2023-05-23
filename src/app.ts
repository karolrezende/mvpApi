import express, { Application, Router, json } from 'express'

const app: Application = express()
app.use(json())

const useRouter: Router = Router()

app.use('/users', useRouter)

export default app
