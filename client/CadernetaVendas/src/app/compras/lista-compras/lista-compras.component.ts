import { Component, OnInit } from '@angular/core';
import { Compra } from '../models/compra';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'cv-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  compras: Compra[] = [];

  constructor(private compraService: CompraService) { }

  ngOnInit() {
    this.compraService.obterCompras().subscribe(
      compras => {
        this.compras = compras;
        console.log(compras);
      }
    )
  }
}
