import client from './config'

const startDatabase = async (): Promise<void> => {
    await client.connect()
    console.log('Conexão com o banco de dados bem sucedida!')
}

export default startDatabase
