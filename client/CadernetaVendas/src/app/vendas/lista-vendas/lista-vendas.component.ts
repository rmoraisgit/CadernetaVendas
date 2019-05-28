import { Component, OnInit } from '@angular/core';
import { VendasService } from '../services/vendas.service';
import { Venda } from '../models/venda';

@Component({
  selector: 'cv-lista-vendas',
  templateUrl: './lista-vendas.component.html',
  styleUrls: ['./lista-vendas.component.css']
})
export class ListaVendasComponent implements OnInit {

  vendas: Venda[] = [];

  constructor(private vendaService: VendasService) { }

  ngOnInit() {
    this.vendaService.obterVendas().subscribe(
      vendas => {
        this.vendas = vendas;
        console.log(vendas);
      }
    )
  }

}
