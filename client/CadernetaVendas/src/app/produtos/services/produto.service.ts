import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/services/base.service';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  obterProdutos() {
    
      return this.http.get<Produto[]>(this.UrlServiceV1 + "produtos");
  };

  adicionarProduto(nome: string, valor: number, peso: number, descricao: string, categoriaId: string, file: File,
    altura?: number, largura?: number, capacidade?: number) {

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('valor', valor.toString().replace('.', ','));
    formData.append('peso', peso.toString().replace('.', ','));
    formData.append('descricao', descricao);
    formData.append('image', file);
    formData.append('categoriaId', categoriaId);

    altura != undefined ? formData.append('altura', altura.toString().replace('.', ',')) : "0";
    largura != undefined ? formData.append('largura', largura.toString().replace('.', ',')) : "0";
    capacidade != undefined ? formData.append('capacidade', capacidade.toString().replace('.', ',')) : "0";

    console.log(valor.toString());

    return this.http.post(this.UrlServiceV1 + "produtos/adicionar", formData);
  };
}
