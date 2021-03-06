import { Component, OnInit, ViewChildren, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { validationMessagesCompra } from './validation-messages-compra';
import { Observable, fromEvent, merge } from 'rxjs';

import { Produto } from 'src/app/produtos/models/produto';
import { ProdutoCompra, Compra } from '../models/compra';
import { CompraService } from '../services/compra.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'cv-registrar-compra',
  templateUrl: 'registrar-compra.component.html',
  styleUrls: ['./registrar-compra.component.css']
})
export class RegistrarCompraComponent implements OnInit, AfterViewInit {

  compraForm: FormGroup;

  produtos: Produto[] = [];
  compra: Compra = new Compra();
  novoProdutoCarrinho: ProdutoCompra;

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: ModalService,
    private compraService: CompraService,
    private alertService: AlertService) {

    this.genericValidator = new GenericValidator(validationMessagesCompra);
  }

  ngOnInit(): void {

    this.compraForm = this.formBuilder.group({
      fornecedor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      total: [{ value: '', disabled: true }]
    });
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.compraForm);
      console.log(this.displayMessage)
    })
  }

  openModal(modalCompra) {
    
    this.modalService.abrirModal(modalCompra);
  }

  registrar() {

    this.compra.fornecedor = this.compraForm.get('fornecedor').value;
    this.compra.total = this.compraForm.get('total').value;

    console.log(this.compra)

    this.compraService.registrarCompra(this.compra).subscribe(
      res => {
        console.log(res);
        this.alertService.success('Compra registrada com sucesso.');
        this.router.navigate(['compras']);
      }
    )
  }

  obterProdutoParaCarrinho(produto: ProdutoCompra) {

    let quantidade = produto.quantidade;
    let precoUnit = produto.valorUnitario;

    produto.valorFinal = this.calcularPrecoFinalProduto(+produto.valorUnitario, +produto.quantidade);

    produto.valorUnitarioFormatado = produto.valorUnitario;

    this.compra.produtosCompra.push(produto);

    console.log(this.compra);

    this.calcularValorTotalPago();

    this.compraForm.get('total').setValue(this.calcularValorTotalPago());
  }

  private calcularPrecoFinalProduto(valorUnitario, quantidade): number {

    console.log(valorUnitario)

    return +valorUnitario * +quantidade;
  }

  private calcularValorTotalPago(): Number {

    let valorTotal: number = 0;

    if (this.compra.produtosCompra.length == 0) return 0

    this.compra.produtosCompra.forEach(produto => {
      valorTotal += produto.valorFinal;
    });

    console.log(valorTotal);

    return valorTotal
  }

  removerProdutoCarrinho(event) {

    let idProduto: string = event.parentNode.parentNode.cells[0].innerText;
    
    this.removerProdutoLista(idProduto)
  }

  removerProdutoLista(idProdutoRemovido: string) {

    this.compra.produtosCompra.forEach(produto => {
      if (produto.produtoId == idProdutoRemovido) {
        this.compra.produtosCompra = this.compra.produtosCompra.filter(p => p.produtoId !== idProdutoRemovido);
      }
    });

    this.compraForm.get('total').setValue(this.calcularValorTotalPago());

    console.log('DEPOIS DE REMOVER')
    console.log(this.produtos);
  }
}