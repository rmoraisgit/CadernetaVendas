export class Cliente {

    constructor(){
        this.endereco = new Endereco();
    }

    id: string;
    nome: string;
    cpf: string;
    saldoDevedor: number;
    telefone: string;
    celular: string;
    email: string;
    ativo: boolean;
    dataCadastro: Date;
    endereco: Endereco;
    clienteCompras: ClienteCompra[];
}

export class Endereco {
    id: string;
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