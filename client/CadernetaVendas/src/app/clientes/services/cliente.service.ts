import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/services/base.service';
import { Cliente } from '../models/cliente';
import { UserTokenService } from 'src/app/core/user-token/user-token.service';
import { Pagamento } from '../registro-pagamento/pagamento';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {

  constructor(private http: HttpClient,
    private UserTokenService: UserTokenService) { super(); }

  obterClientes() {
    return this.http.get<Cliente[]>(this.UrlServiceV1 + 'clientes',
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.UserTokenService.getAccessToken()}`)
      }
    );
  };

  obterClientePorId(clienteId: string) {
    return this.http.get<Cliente>(this.UrlServiceV1 + `clientes/${clienteId}`,
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.UserTokenService.getAccessToken()}`)
      }
    );
  };

  adicionarCliente(cliente: any) {
    return this.http.post(this.UrlServiceV1 + 'clientes/adicionar', cliente,
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.UserTokenService.getAccessToken()}`)
      });
  };

  atualizarCliente(cliente: Cliente) {
    return this.http.put(this.UrlServiceV1 + `clientes/${cliente.id}`, cliente, {
      headers: this.ObterHeaderJson()
        .headers.set('authorization', `Bearer ${this.UserTokenService.getAccessToken()}`)
    });
  };

  registrarPagamentoCliente(pagamento: Pagamento) {
    return this.http.post(this.UrlServiceV1 + `clientes/registrar-pagamento/${pagamento.clienteId}`, pagamento, {
      headers: this.ObterHeaderJson()
        .headers.set('authorization', `Bearer ${this.UserTokenService.getAccessToken()}`)
    });
  };
}