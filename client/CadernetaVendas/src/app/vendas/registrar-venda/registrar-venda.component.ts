import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Produto } from 'src/app/produtos/models/produto';
import { Venda, ProdutoVenda } from '../models/venda';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { VendasService } from '../services/vendas.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { validationMessagesVenda } from './validation-messages-venda';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'cv-registrar-venda',
  templateUrl: './registrar-venda.component.html',
  styleUrls: ['./registrar-venda.component.css']
})
export class RegistrarVendaComponent implements OnInit, AfterViewInit {

  vendaForm: FormGroup;

  produtos: Produto[] = [];
  venda: Venda = new Venda();
  novoProdutoCarrinho: ProdutoVenda;

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: ModalService,
    private vendaService: VendasService,
    private alertService: AlertService) {

    this.genericValidator = new GenericValidator(validationMessagesVenda);

  }

  ngOnInit() {

    this.vendaForm = this.formBuilder.group({
      cliente: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      total: [{ value: '', disabled: true }]
    });
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.vendaForm);
      console.log(this.displayMessage)
    })
  }

  open(modalProdutos) {
    
    this.modalService.abrirModal(modalProdutos);
  }
}
