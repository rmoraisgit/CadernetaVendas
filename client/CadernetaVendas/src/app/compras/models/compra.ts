export class Compra {

    constructor(){
        this.produtosCompra = new Array<ProdutoCompra>();
    }

    id: string;
    fornecedor: string;
    total: number;
    dataCadastro: Date;
    produtosCompra: ProdutoCompra[];
}

export class ProdutoCompra {
    produtoId: string;
    nome: string;
    valorUnitario: number;
    valorUnitarioFormatado : any;
    valorFinal: number;
    quantidade: number;
}