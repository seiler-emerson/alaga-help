// ============================================================================================== //
// =========================================== LOGIN ============================================ //
// ============================================================================================== //

import axios from 'axios';
import { api } from './axios'

// // CAPTURA OS DADOS INCIAIS DO USUARIO LOGADO
export const getAddressByCep = async (cep: string): Promise<any> => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response
}

