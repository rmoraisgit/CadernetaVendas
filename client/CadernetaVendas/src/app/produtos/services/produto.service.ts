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

  adicionarProduto(produto: Produto) {
      
      return this.http.post(this.UrlServiceV1 + "produtos", produto, super.ObterHeaderJson());
  };
}
