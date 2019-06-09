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
}

export interface Categoria {
    id: string;
    nome: string;
}