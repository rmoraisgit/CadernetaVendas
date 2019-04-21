// import { Endereco } from './endereco';

export interface Cliente {   
    nome: string;
    cpf: string;
    saldoDevedor: number;
    telefone: string;
    celular: string;
    email: string;
    endereco: Endereco;
}

export interface Endereco {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
}