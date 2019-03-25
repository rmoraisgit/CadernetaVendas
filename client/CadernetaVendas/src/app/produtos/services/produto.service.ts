import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/services/base.service';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  // obterCategorias(): Observable<Categoria[]> {
  //     return this.http
  //         .get<Categoria[]>(this.UrlServiceV1 + "eventos/categorias")
  //         .catch(super.serviceError);
  // };

  adicionarProduto(nome: string, valor: number, peso: number, descricao: string, categoriaId: string, file: File,
    altura?: number, largura?: number, capacidade?: number) {

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('valor', valor.toString());
    formData.append('peso', peso.toString());
    formData.append('image', file);
    formData.append('categoriaId', categoriaId);

    altura != undefined ? formData.append('altura', altura.toString()) : "0";
    largura != undefined ? formData.append('largura', largura.toString()) : "0";
    capacidade != undefined ? formData.append('capacidade', capacidade.toString()) : "0";

    return this.http.post(this.UrlServiceV1 + "produtos", formData);
  };

}
