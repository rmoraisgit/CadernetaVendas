import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ClienteService } from '../services/cliente.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { GenericValidator } from 'src/app/utils/genericValidator';

@Component({
  selector: 'cv-registro-pagamento',
  templateUrl: './registro-pagamento.component.html',
  styleUrls: ['./registro-pagamento.component.css']
})
export class RegistroPagamentoComponent implements OnInit {

  pagamentoForm: FormGroup;
  metodosPagamento : any =
  [
    { id: '1', nome: 'Dinheiro' },
    { id: '2', nome: 'Cartão' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private alertService: AlertService,
  ) {

    // this.genericValidator = new GenericValidator(validationMessagesCliente);
  }
  ngOnInit() {
    this.pagamentoForm = this.formBuilder.group({
      dataPagamento: [],
      metodosPagamento: [new FormControl(this.metodosPagamento)],
      totalPago: []
    });
    this.pagamentoForm.get('metodosPagamento').setValue('Selecione...');
  }
}
