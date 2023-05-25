//neste ambiente eu comeco a ligar o tipo de requisição com a sua funcionalidade e middlewars
import { Router } from "express";
import { createUserController, getUserController, getUserIdController } from "../controllers/user.controllers";
import { ensureBody } from "../middlewares/ensureBody.middleware";
import { userSchemaRequest } from "../schemas/user.schema";
import { ensureEmail } from "../middlewares/ensureEmail.middleware";
import { loginUserController } from "../controllers/login.controllers";
import { ensureToken } from "../middlewares/ensureToken.middleware";
import { ensureAdm } from "../middlewares/ensureAdm.middleware";

export const useRouter: Router = Router()
export const loginRouter: Router = Router()

useRouter.post('', ensureBody(userSchemaRequest), ensureEmail, createUserController) //cadastrar um novo usuário
loginRouter.post('' ,loginUserController) //logar com usuário na aplicação retornando um token
useRouter.get('', ensureToken, ensureAdm,getUserController) //listar todos os usuários na aplicação
useRouter.get('/profile', ensureToken, getUserIdController) //listar um usuário que está cadastrado na aplicação
useRouter.patch('/:id', ) //atualizar os dados de um usuário
useRouter.delete('/:id', ) //fazer um soft delete de um usuário
useRouter.put('/:id/recover', ) //recuperar um usuário