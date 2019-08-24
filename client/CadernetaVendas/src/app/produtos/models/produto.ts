export class Produto {
    id: string;
    nome: string;
    valor: number;
    peso: number;
    descricao: string;
    altura: number;
    largura: number;
    capacidade: number;
    dimensao: string;
    disponivel: boolean;
    quantidade: number;
    FormFile: any;
    foto: any;
    dataCadastro: Date;
    categoriaId: string;
    valorCompra: number;
    valorVenda: number;
    kardex: Kardex[];
}

export interface Categoria {
    id: string;
    nome: string;
}

export interface Kardex {
    dataCadastro: string;
    quantidade: 10
    quantidadeAntes: 90
    quantidadeDepois: 80
}