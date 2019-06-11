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
    return this.http.get<Produto[]>(this.UrlServiceV1 + 'produtos');
  };

  adicionarProduto(produto: FormData) {
    return this.http.post(this.UrlServiceV1 + 'produtos/adicionar', produto, this.ObterHeaderFormData());
  };
}