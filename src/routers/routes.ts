//neste ambiente eu comeco a ligar o tipo de requisição com a sua funcionalidade e middlewars
import { Router } from "express";
import { createUserController, deleteUserController, getUserController, getUserIdController, patchUserController, putUserController } from "../controllers/user.controllers";
import { ensureBody } from "../middlewares/ensureBody.middleware";
import { userSchemaPatch, userSchemaRequest } from "../schemas/user.schema";
import { ensureEmail } from "../middlewares/ensureEmail.middleware";
import { loginUserController } from "../controllers/login.controllers";
import { ensureToken } from "../middlewares/ensureToken.middleware";
import { ensureAdm } from "../middlewares/ensureAdm.middleware";
import { userLoginRequest } from "../schemas/login.schema";
import { ensureUser } from "../middlewares/ensureUser.middleware";

export const useRouter: Router = Router()
export const loginRouter: Router = Router()

useRouter.post('', ensureBody(userSchemaRequest), ensureEmail, createUserController) //cadastrar um novo usuário
loginRouter.post('' ,ensureBody(userLoginRequest), loginUserController) //logar com usuário na aplicação retornando um token
useRouter.get('', ensureToken, ensureAdm,getUserController) //listar todos os usuários na aplicação
useRouter.get('/profile',  ensureToken, getUserIdController) //listar um usuário que está cadastrado na aplicação
useRouter.patch('/:id', ensureBody(userSchemaPatch), ensureUser, ensureToken, patchUserController) //atualizar os dados de um usuário
useRouter.delete('/:id', ensureToken, ensureUser, deleteUserController) //fazer um soft delete de um usuário
useRouter.put('/:id/recover', ensureToken, ensureUser, putUserController) //recuperar um usuário