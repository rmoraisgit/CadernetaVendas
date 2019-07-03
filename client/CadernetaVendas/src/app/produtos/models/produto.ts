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
    kardex: Kardex[];
}

export interface Categoria {
    id: string;
    nome: string;
}

export interface Kardex {
    dataCadastro: string;
    produtoId: "376216cd-b893-4c6b-8d2e-17a8e427d95e"
    quantidade: 10
    quantidadeAntes: 90
    quantidadeDepois: 80
}