//neste ambiente eu comeco a ligar o tipo de requisição com a sua funcionalidade e middlewars

import { useRouter } from "../app";


useRouter.post('', ) //cadastrar um novo usuário
useRouter.post('', ) //logar com usuário na aplicação retornando um token
useRouter.get('', ) //listar todos os usuários na aplicação
useRouter.get('/profile', ) //listar um usuário que está cadastrado na aplicação
useRouter.patch('/:id', ) //atualizar os dados de um usuário
useRouter.delete('/:id', ) //fazer um soft delete de um usuário
useRouter.put('/:id/recover', ) //recuperar um usuário