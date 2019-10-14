import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pagamento } from '../pagamento';
import { Cliente } from '../../models/cliente';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'cv-confirma-pagamento',
  templateUrl: './confirma-pagamento.component.html',
  styleUrls: ['./confirma-pagamento.component.css']
})
export class ConfirmaPagamentoComponent implements OnInit {

  @Input() dadosPagamento: Pagamento;
  @Input() cliente: Cliente;
  @Input() modalAtiva : NgbModalRef;
  @Input() result: any;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  fecharModal() {
    // let tio = this.modalService.testeModal(modal);
    console.log(this.modalAtiva);
    console.log(this.result);
    let teste = this.modalAtiva.result;
    this.modalAtiva.close(this.result);
  }
}