export class Venda {

    constructor(){
        this.produtosVenda = new Array<ProdutoVenda>();
    }

    id: string;
    clienteId: string;
    total: number;
    produtosVenda: ProdutoVenda[];
}

export class ProdutoVenda {
    produtoId: string;
    nome: string;
    valorVenda: number;
    valorSugerido : number;
    valorFinal : number;
    quantidade: number;
}