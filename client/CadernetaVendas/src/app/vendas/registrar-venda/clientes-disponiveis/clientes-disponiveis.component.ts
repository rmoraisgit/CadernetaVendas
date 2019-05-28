import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClienteService } from 'src/app/clientes/services/cliente.service';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'cv-clientes-disponiveis',
  templateUrl: './clientes-disponiveis.component.html',
  styleUrls: ['./clientes-disponiveis.component.css']
})
export class ClientesDisponiveisComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();

  clientesSelecionados: Cliente[] = [];
  clienteSelecionado: Cliente;

  page: number = 1;
  pageSize: number = 5;
  collectionSize = this.clientes.length;

  @Output() enviarCliente: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  constructor(private clienteService : ClienteService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.clienteService.obterClientes().subscribe(clientes => {
      this.clientes = clientes
      console.log(this.clientes)
    })
  }

  selecionarItem(elemento: any) /* elemento: ElementRef */ {

    if (this.clientesSelecionados.length != 0) {
      this.desmarcarItem(elemento);
      return;
    }

    console.log(this.cliente);

    console.log('AAAAAAA E NOID')
    console.log(elemento);
    console.log(elemento.parentNode.cells[0].innerText)
    console.log(elemento.parentNode.cells[1].innerText)

    let clienteId = elemento.parentNode.cells[0].innerText;
    let nomeCliente = elemento.parentNode.cells[1].innerText;

    const cliente: Cliente = new Cliente();
    cliente.id = clienteId;
    cliente.nome = nomeCliente;

    elemento.parentNode.className = 'selecionado';

    this.clientesSelecionados.push(cliente);
    this.clienteSelecionado = cliente;
    console.log(this.clienteSelecionado)
  }

  desmarcarItem(elemento: any) {

    console.log('NO METODO DESMARCAR ITEM')

    if (elemento.parentNode.className != 'selecionado') return;

    elemento.parentNode.className = 'nao-selecionado';

    this.clientesSelecionados = [];
  }

  enviarClienteParaForm() {

    this.enviarCliente.emit(this.clienteSelecionado);
    this.modalService.fecharModal('modalProdutos');
  }
}