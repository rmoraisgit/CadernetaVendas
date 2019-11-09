import { Pagamento } from '../registro-pagamento/pagamento';

export class Cliente {

    constructor() {
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
    pagamentos: Pagamento[];
    extratoPagamentosCompras: ExtratoPagamentosCompras[];
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

export class ExtratoPagamentosCompras {

    constructor(valorTotal, dataCadastro, saldoDevedorAntes, saldoDevedorDepois) {

        this.valorTotal = valorTotal;
        this.dataCadastro = dataCadastro;
        this.saldoDevedorAntes = saldoDevedorAntes;
        this.saldoDevedorDepois = saldoDevedorDepois;
    }

    clienteId: string;
    compraId: string;
    valorTotal: number;
    dataCadastro: Date;
    saldoDevedorAntes: number;
    saldoDevedorDepois: number;
}