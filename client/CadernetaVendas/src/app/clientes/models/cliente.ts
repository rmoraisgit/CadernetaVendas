// import { Endereco } from './endereco';

export class Cliente {
    id: string;
    nome: string;
    cpf: string;
    saldoDevedor: number;
    telefone: string;
    celular: string;
    email: string;
    ativo: boolean;
    endereco: Endereco;
    clienteCompras: ClienteCompra[];
}

export class Endereco {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    uf: string;
    localidade: string;
}

export class ClienteCompra {
    saldoDevedorAntes: number;
    saldoDevedorDepois: number;
    dataCadastro: Date;
}