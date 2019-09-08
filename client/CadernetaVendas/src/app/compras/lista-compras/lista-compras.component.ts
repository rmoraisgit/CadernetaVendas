import { Component, OnInit } from '@angular/core';
import { Compra } from '../models/compra';
import { CompraService } from '../services/compra.service';
import { UserTokenService } from 'src/app/core/user-token/user-token.service';

@Component({
  selector: 'cv-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  compras: Compra[] = [];
  usuarioAutorizado: boolean = false;

  constructor(private userTokenService: UserTokenService,
              private compraService: CompraService) { }

  ngOnInit() {
    if (this.userTokenService.hasAccessToken()) {

      this.usuarioAutorizado = true;
      this.compraService.obterCompras().subscribe(compras => {
        this.compras = compras;
        console.log(compras);
      });
    }
  }
}
