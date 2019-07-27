import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';

import { ClienteService } from '../services/cliente.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { Pagamento } from './pagamento';
import { validationMessagesPagamento } from '../validation-messages-cliente';
import { selectValidator } from 'src/app/utils/selectValidator';

@Component({
  selector: 'cv-registro-pagamento',
  templateUrl: './registro-pagamento.component.html',
  styleUrls: ['./registro-pagamento.component.css']
})
export class RegistroPagamentoComponent implements OnInit, AfterViewInit {

  pagamento: Pagamento;
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
      totalPago: ['', [Validators.required]]
    });
    this.pagamentoForm.get('metodosPagamento').setValue('Selecione...');
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.pagamentoForm);
    })
  }

  gerarDadosPagamento(modalConfirmaPagamento) {

    this.pagamento = this.pagamentoForm.getRawValue();
    console.log(this.pagamento)
    this.modalService.abrirModal(modalConfirmaPagamento);
  }
}
