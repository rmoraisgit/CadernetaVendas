import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendasService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  obterVendas() {
    return this.http.get<Venda[]>(this.UrlServiceV1 + 'vendas');
  };

  registrarVenda(compra : Venda) {
    return this.http.post(this.UrlServiceV1 + 'vendas/registrar', compra, this.ObterHeaderJson())
  }
}
