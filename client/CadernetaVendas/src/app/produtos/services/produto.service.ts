import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/services/base.service';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';
import { UserTokenService } from 'src/app/core/user-token/user-token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {

  constructor(private http: HttpClient,
    private userTokenService: UserTokenService) { super(); }

  obterProdutos() {
    return this.http.get<Produto[]>(this.UrlServiceV1 + 'produtos',
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.userTokenService.getAccessToken()}`)
      });
  };

  obterProdutoPorId(produtoId: string) {
    return this.http.get<Produto>(this.UrlServiceV1 + `produtos/${produtoId}`,
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.userTokenService.getAccessToken()}`)
      });
  };

  adicionarProduto(produto: FormData) {
    return this.http.post(this.UrlServiceV1 + 'produtos/adicionar', produto, this.ObterHeaderFormData());
  };

  atualizarProduto(id: string, produto: FormData) {
    return this.http.put(this.UrlServiceV1 + `produtos/${id}`, produto, this.ObterHeaderFormData());
  };
}