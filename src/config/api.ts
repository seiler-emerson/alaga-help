// ============================================================================================== //
// =========================================== LOGIN ============================================ //
// ============================================================================================== //

import { api } from './axios'

// // CAPTURA OS DADOS INCIAIS DO USUARIO LOGADO
export const getPersonData = async (): Promise<any> => {
    const response = await api.get('/person/initial-data')
    return response
}