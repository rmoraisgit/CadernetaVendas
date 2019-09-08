import { Component, OnInit } from '@angular/core';
import { UserTokenService } from 'src/app/core/user-token/user-token.service';
import { VendasService } from '../services/vendas.service';
import { Venda } from '../models/venda';

@Component({
  selector: 'cv-lista-vendas',
  templateUrl: './lista-vendas.component.html',
  styleUrls: ['./lista-vendas.component.css']
})
export class ListaVendasComponent implements OnInit {

  vendas: Venda[] = [];
  usuarioAutorizado: boolean = false;

  constructor(private userTokenService: UserTokenService,
    private vendaService: VendasService) { }

  ngOnInit() {
    if (this.userTokenService.hasAccessToken()) {

      this.usuarioAutorizado = true;

      this.vendaService.obterVendas().subscribe(vendas => {
        this.vendas = vendas;
      });
    }
  }
}
