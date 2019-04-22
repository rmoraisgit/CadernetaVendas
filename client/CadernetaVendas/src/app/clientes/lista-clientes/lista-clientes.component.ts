import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'cv-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: Cliente[] = []

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.obterClientes().subscribe(clientes => {
      this.clientes = clientes;
      console.log(this.clientes);
    })
  }

}
