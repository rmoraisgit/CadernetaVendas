import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { Endereco } from '../clientes/models/cliente';
// import { Endereco } from '../clientes/models/endereco';

@Injectable({
    providedIn: 'root'
  })
export class EnderecoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterEndereco(cep: string) {

        return this.http.get<Endereco>(this.UrlServiceViaCep + cep + '/json');
    }
}