export class Produto {
    nome: string;
    valor: number;
    oeso: number;
    altura: number;
    largura: number;
    capacidade: number;
    dimensao: string;
    descricao: string;
    disponivel: boolean;
    quantidade: number;
    dataCadastro: Date;
    categoriaId: string;
}

export interface Categoria {
    id: string;
    nome: string;
}