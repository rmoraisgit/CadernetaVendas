import { Component, OnInit } from '@angular/core';

import { UserTokenService } from 'src/app/core/user-token/user-token.service';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'cv-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: Cliente[] = []
  usuarioAutorizado: boolean = false;

  constructor(private UserTokenService: UserTokenService,
    private clienteService: ClienteService) { }

  ngOnInit() {

    if (this.usuarioEstaAutorizado()) {
      this.clienteService.obterClientes().subscribe(clientes => {
        this.clientes = clientes;
      });
    }
  }

  usuarioEstaAutorizado() {
    this.usuarioAutorizado = this.UserTokenService.hasAccessToken();
    return this.usuarioAutorizado;
  }
}
