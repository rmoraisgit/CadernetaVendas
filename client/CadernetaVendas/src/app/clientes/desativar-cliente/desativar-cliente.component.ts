import { Component, OnInit, Input } from '@angular/core';

import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'cv-desativar-cliente',
  templateUrl: './desativar-cliente.component.html',
  styleUrls: ['./desativar-cliente.component.css']
})
export class DesativarClienteComponent implements OnInit {

  @Input() cliente: Cliente;

  constructor(private clienteService: ClienteService,
              private modalService: ModalService) { }

  ngOnInit() {
  }

  desativarCliente() {
    this.clienteService.desativarCliente(this.cliente)
      .subscribe(res => {
        console.log(this.cliente);
        this.cliente.ativo = res.data.ativo;
        // this.cliente.ativo = false;
        this.modalService.fecharModal(this);
        console.log(this.cliente);
      },
      error => {
        // Notificar erro
      });
  }
}