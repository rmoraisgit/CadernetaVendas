import { Component, OnInit, ViewChildren, ElementRef, ViewChild, Renderer, AfterViewInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { validationMessagesCompra } from './validation-messages-compra';
import { Produto } from 'src/app/produtos/models/produto';
import { ProdutoCompra, Compra } from '../models/compra';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'cv-registrar-compra',
  templateUrl: 'registrar-compra.component.html',
  styleUrls: ['./registrar-compra.component.css']
})
export class RegistrarCompraComponent implements OnInit, AfterViewInit {

  compraForm: FormGroup;
  closeResult: string;

  produtos: Produto[] = [];
  compra: Compra = new Compra();
  novoProdutoCarrinho: ProdutoCompra;

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private formBuilder: FormBuilder,
    private render: Renderer,
    private modalService: NgbModal) {

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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  registrar() {

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

    let valorTotalCompra: number = 0;

    if (this.compra.produtosCompra.length == 0) {
      console.log('TEM Q ZERAR O TOTAL')
      return 0;
    }

    this.compra.produtosCompra.forEach(produto => {
      valorTotalCompra += produto.valorFinal;
    });

    console.log(valorTotalCompra);

    return valorTotalCompra
  }

  removerProdutoCarrinho(event) {

    console.log(event.parentNode.parentNode.cells)
    console.log(event);

    let idProduto: string = event.parentNode.parentNode.cells[0].innerText;
    console.log(idProduto);

    // event.parentNode.parentNode.remove();
    this.removerProdutoLista(idProduto)
  }

  removerProdutoLista(idProdutoRemovido: string) {

    console.log('ANTES DE REMOVER')
    console.log(this.produtos);

    this.compra.produtosCompra.forEach(produto => {
      if (produto.id == idProdutoRemovido) {
        this.compra.produtosCompra = this.compra.produtosCompra.filter(p => p.id !== idProdutoRemovido);
      }
    });

    this.compraForm.get('total').setValue(this.calcularValorTotalPago());

    console.log('DEPOIS DE REMOVER')
    console.log(this.produtos);
  }

  mouseEnter(elemento: ElementRef) {
    console.log(elemento);
    this.render.setElementStyle(elemento, 'color', '#37c6f0');
  }

  mouseLeave(elemento: ElementRef) {
    console.log(elemento);
    this.render.setElementStyle(elemento, 'color', '#384158');
  }
}