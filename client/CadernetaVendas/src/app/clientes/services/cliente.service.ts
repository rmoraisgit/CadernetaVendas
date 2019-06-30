import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { TokenService } from 'src/app/core/token/token.service';

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
          .headers.set('authorization', `Bearer ${this.tokenService.getToken()}`)
      }
    );
  };

  adicionarCliente(cliente: any) {
    return this.http.post(this.UrlServiceV1 + 'clientes/adicionar', cliente,
    {
      headers: this.ObterHeaderJson()
        .headers.set('authorization', `Bearer ${this.tokenService.getToken()}`)
    });
  };
}