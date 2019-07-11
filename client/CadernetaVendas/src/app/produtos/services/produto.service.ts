import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/services/base.service';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {

  constructor(private http: HttpClient,
    private tokenService: TokenService) { super(); }

  obterProdutos() {
    return this.http.get<Produto[]>(this.UrlServiceV1 + 'produtos',
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.tokenService.getToken()}`)
      });
  };

  obterProdutoPorId(id: string) {
    return this.http.get<Produto>(this.UrlServiceV1 + `produtos/${id}`,
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.tokenService.getToken()}`)
      });
  };

  adicionarProduto(produto: FormData) {
    return this.http.post(this.UrlServiceV1 + 'produtos/adicionar', produto, this.ObterHeaderFormData());
  };

  atualizarProduto(id: string, produto: FormData) {
    return this.http.put(this.UrlServiceV1 + `produtos/${id}`, produto, this.ObterHeaderFormData());
  };
}