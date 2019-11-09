import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';

import { ClienteService } from '../services/cliente.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { Pagamento } from './pagamento';
import { Cliente, ExtratoPagamentosCompras } from '../models/cliente';
import { validationMessagesPagamento } from '../validation-messages-cliente';
import { selectValidator } from 'src/app/utils/selectValidator';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cv-registro-pagamento',
  templateUrl: './registro-pagamento.component.html',
  styleUrls: ['./registro-pagamento.component.css']
})
export class RegistroPagamentoComponent implements OnInit, AfterViewInit {

  pagamento: Pagamento;
  @Input() cliente: Cliente;
  modalConfirmaPagamento: NgbModalRef;
  result: any;
  closeResult: any;
  pagamentoForm: FormGroup;
  metodosPagamento: any =
    [
      { id: '1', nome: 'Dinheiro' },
      { id: '2', nome: 'Cartão' }
    ]

  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private alertService: AlertService,
    private modalService: ModalService
  ) {

    this.genericValidator = new GenericValidator(validationMessagesPagamento);
  }

  ngOnInit() {
    this.pagamentoForm = this.formBuilder.group({
      dataPagamento: ['', [Validators.required]],
      metodosPagamento: [new FormControl(this.metodosPagamento), [selectValidator]],
      valorTotal: ['', [Validators.required]]
    });
    this.pagamentoForm.get('metodosPagamento').setValue('Selecione...');
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.pagamentoForm);
    })
  }

  gerarDadosPagamento(modalConfirmaPagamento) {

    this.pagamento = this.pagamentoForm.getRawValue();
    let dataPagamento = this.pagamentoForm.get('dataPagamento').value;
    this.pagamento.dataCadastro = new Date(dataPagamento.year, dataPagamento.month - 1, dataPagamento.day);
    this.modalConfirmaPagamento = this.modalService.abrirModal(modalConfirmaPagamento);
    this.result = this.modalConfirmaPagamento.result;

    console.log(this.modalConfirmaPagamento);
    console.log(this.modalConfirmaPagamento.result);
  }

  fecharModalConfirmacaoPagamento() {

    this.modalService.fecharModal('modalConfirmaPagamento');
  }

  confirmarPagamento() {
    this.pagamento.clienteId = this.cliente.id;

    this.clienteService.registrarPagamentoCliente(this.pagamento).subscribe(
      result => {
        this.cliente.saldoDevedor = result.data.saldoDevedor;

        var tamanhoListaPagamentos = result.data.pagamentos.length;
        var ultimoPagamentoRegistrado = result.data.pagamentos[tamanhoListaPagamentos - 1];
 
        this.cliente.extratoPagamentosCompras.unshift(
            new ExtratoPagamentosCompras(
              ultimoPagamentoRegistrado.valorTotal, 
              ultimoPagamentoRegistrado.dataCadastro,
              ultimoPagamentoRegistrado.saldoDevedorAntes,
              ultimoPagamentoRegistrado.saldoDevedorDepois)
          );

        this.alertService.success('Pagamento registrado com sucesso.');
        this.modalService.fecharTodasModals();
      },
      fail => { console.log(fail); }
    );
  }
}