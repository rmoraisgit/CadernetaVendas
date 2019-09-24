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
import { Cliente } from 'src/app/clientes/models/cliente';

@Component({
  selector: 'cv-registrar-venda',
  templateUrl: './registrar-venda.component.html',
  styleUrls: ['./registrar-venda.component.css']
})
export class RegistrarVendaComponent implements OnInit, AfterViewInit {

  vendaForm: FormGroup;

  produtos: Produto[] = [];
  clientes: Cliente[] = [];
  venda: Venda = new Venda();
  novoProdutoCarrinho: ProdutoVenda;
  errors: any[] = [];

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

  obterProdutoParaCarrinho(produto: ProdutoVenda) {

    let quantidade = produto.quantidade;
    let valorVenda = produto.valorVenda;

    produto.valorFinal = this.calcularPrecoFinalProduto(+produto.valorVenda, +produto.quantidade);

    // produto.valorUnitarioFormatado = produto.valorUnitario;

    this.venda.produtosVenda.push(produto);

    // console.log(this.compra);

    this.calcularValorTotalPago();

    this.vendaForm.get('total').setValue(this.calcularValorTotalPago());
  }

  obterClienteParaForm(cliente: Cliente) {

    // produto.valorUnitarioFormatado = produto.valorUnitario;

    this.clientes.push(cliente);

    // console.log(this.compra);

    this.calcularValorTotalPago();

    this.vendaForm.get('cliente').setValue(cliente.nome);
  }

  private calcularPrecoFinalProduto(valorUnitario, quantidade): number {

    console.log(valorUnitario)

    return +valorUnitario * +quantidade;
  }

  private calcularValorTotalPago(): Number {

    let valorTotal: number = 0;

    if (this.venda.produtosVenda.length == 0) return 0

    this.venda.produtosVenda.forEach(produto => {
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

    this.venda.produtosVenda.forEach(produto => {
      if (produto.produtoId == idProdutoRemovido) {
        this.venda.produtosVenda = this.venda.produtosVenda.filter(p => p.produtoId !== idProdutoRemovido);
      }
    });

    this.vendaForm.get('total').setValue(this.calcularValorTotalPago());

    console.log('DEPOIS DE REMOVER')
    console.log(this.produtos);
  }

  removerClienteForm(event) {

    let idCliente: string = event.parentNode.parentNode.cells[0].innerText;

    this.removerClienteLista(idCliente)
  }

  removerClienteLista(idClienteRemovido: string) {

    this.clientes.forEach(cliente => {
      if (cliente.id == idClienteRemovido) {
        this.clientes = this.clientes.filter(p => p.id !== idClienteRemovido);
      }
    });

    this.vendaForm.get('total').setValue(this.calcularValorTotalPago());

    console.log('DEPOIS DE REMOVER')
    console.log(this.produtos);
  }

  registrar() {

    this.venda.clienteId = this.clientes[0].id;
    this.venda.total = this.vendaForm.get('total').value;

    console.log(this.venda)

    this.vendaService.registrarVenda(this.venda).subscribe(
      res => {
        console.log(res);
        this.alertService.success('Venda registrada com sucesso.');
        this.router.navigate(['vendas']);
      },
      fail => { console.log(fail); this.errors = fail.error.errors }
    )
  }

  fecharErros() {
    this.errors = [];
  }
}
