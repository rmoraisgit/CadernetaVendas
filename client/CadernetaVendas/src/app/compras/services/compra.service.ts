import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';

import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  registrarCompra(compra : Compra) {
    return this.http.post(this.UrlServiceV1 + 'compras/registrar', compra, this.ObterHeaderJson())
  }
}
