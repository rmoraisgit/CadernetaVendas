import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'cv-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.css']
})
export class DetalhesClienteComponent implements OnInit {

  cliente: Cliente;
  enderecoFormatado: string = '';

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    const clienteId = this.route.snapshot.params.clienteId;

    this.clienteService.obterClientePorId(clienteId)
      .subscribe(cliente => {
        this.cliente = cliente;
        this.formatarEndereco();
      });
  }

  private formatarEndereco(): void {

    this.enderecoFormatado =
      `${this.cliente.endereco.logradouro}, ${this.cliente.endereco.numero} <br>
      ${this.cliente.endereco.bairro} - ${this.cliente.endereco.cidade}/${this.cliente.endereco.estado}`;
  };

  openModal(modal) {
    this.modalService.abrirModal(modal);
  }
}
