export class Compra {

    constructor(){
        this.produtosCompra = new Array<ProdutoCompra>();
    }

    id: string;
    produtosCompra: ProdutoCompra[];
}

export class ProdutoCompra {
    id: string;
    nome: string;
    valorUnitario: number;
    valorUnitarioFormatado : any;
    valorFinal: number;
    quantidade: number;
}