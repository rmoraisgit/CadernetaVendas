import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/services/base.service';
import { Cliente } from '../models/cliente';
import { TokenService } from 'src/app/core/token/token.service';
import { Pagamento } from '../registro-pagamento/pagamento';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {

  constructor(private http: HttpClient,
    private tokenService: TokenService) { super(); }

  obterClientes() {
    return this.http.get<Cliente[]>(this.UrlServiceV1 + 'clientes',
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.tokenService.getAccessToken()}`)
      }
    );
  };

  obterClientePorId(clienteId: string) {
    return this.http.get<Cliente>(this.UrlServiceV1 + `clientes/${clienteId}`,
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.tokenService.getAccessToken()}`)
      }
    );
  };

  adicionarCliente(cliente: any) {
    return this.http.post(this.UrlServiceV1 + 'clientes/adicionar', cliente,
      {
        headers: this.ObterHeaderJson()
          .headers.set('authorization', `Bearer ${this.tokenService.getAccessToken()}`)
      });
  };

  atualizarCliente(cliente: Cliente) {
    return this.http.put(this.UrlServiceV1 + `clientes/${cliente.id}`, cliente, {
      headers: this.ObterHeaderJson()
        .headers.set('authorization', `Bearer ${this.tokenService.getAccessToken()}`)
    });
  };

  registrarPagamentoCliente(pagamento: Pagamento) {
    return this.http.post(this.UrlServiceV1 + `clientes/registrar-pagamento/${pagamento.clienteId}`, pagamento, {
      headers: this.ObterHeaderJson()
        .headers.set('authorization', `Bearer ${this.tokenService.getAccessToken()}`)
    });
  };
}