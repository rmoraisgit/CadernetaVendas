import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  obterClientes() {
    
      return this.http.get<Cliente[]>(this.UrlServiceV1 + 'clientes');
  };

  adicionarCliente(cliente : any) {

    return this.http.post(this.UrlServiceV1 + 'clientes/adicionar', cliente, this.ObterHeaderJson());
  };
}