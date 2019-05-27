import { Component, OnInit, ViewChild, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';

import { Produto } from 'src/app/produtos/models/produto';
import { ProdutoVenda } from '../../models/venda';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { ValidationMessagesItensVenda } from './validation-messages-itens-venda';
import { ProdutoService } from 'src/app/produtos/services/produto.service';

@Component({
  selector: 'cv-itens-venda',
  templateUrl: './itens-venda.component.html',
  styleUrls: ['./itens-venda.component.css']
})
export class ItensVendaComponent implements OnInit {

  @ViewChild('nomeProduto') nomeProduto: ElementRef;
  @ViewChild('precoVenda') precoVenda: ElementRef;
  @ViewChild('precoSugerido') precoSugerido: ElementRef;
  @ViewChild('quantidade') quantidade: ElementRef;

  habilitadoprecoVenda: boolean = false;
  habilitadoPrecoSugerido: boolean = false;
  habilitadoQuantidade: boolean = false;

  produtos: Produto[] = [];

  page: number = 1;
  pageSize: number = 5;
  collectionSize = this.produtos.length;

  produtosSelecionados: ProdutoVenda[] = [];
  produtoSelecionado: ProdutoVenda;

  @Output() enviarProduto: EventEmitter<ProdutoVenda> = new EventEmitter<ProdutoVenda>();

  itensForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private produtoService: ProdutoService) {

    this.genericValidator = new GenericValidator(ValidationMessagesItensVenda);
  }

  ngOnInit(): void {
    this.itensForm = this.formBuilder.group({
      produto: [''],
      precoVenda: [{ value: '', disabled: true }, Validators.required],
      precoSugerido: [{ value: '', disabled: true }, Validators.required],
      quantidade: [{ value: '', disabled: true }, Validators.required],
      auxiliar: ['', Validators.required]
    });

    this.produtoService.obterProdutos().subscribe(produtos => {
      this.produtos = produtos
      console.log(this.produtos)
    })
  }

  selecionarItem(elemento: any) /* elemento: ElementRef */ {

    if (this.produtosSelecionados.length != 0) {
      this.desmarcarItem(elemento);
      return;
    }

    let idProduto = elemento.parentNode.cells[0].innerText;
    let nomeProduto = elemento.parentNode.cells[1].innerText;
    let precoSugerido = elemento.parentNode.cells[3].innerText;

    const produto: ProdutoVenda = new ProdutoVenda();
    produto.produtoId = idProduto;
    produto.nome = nomeProduto;

    this.nomeProduto.nativeElement.value = nomeProduto;
    this.precoSugerido.nativeElement.value = 'R$' + precoSugerido;

    this.itensForm.get('precoVenda').enable();
    this.itensForm.get('quantidade').enable();

    this.itensForm.get('precoVenda').setValidators(Validators.required);
    this.itensForm.get('quantidade').setValidators(Validators.required);

    this.itensForm.get('auxiliar').setValue('x')

    elemento.parentNode.className = 'selecionado';

    this.produtosSelecionados.push(produto);
    this.produtoSelecionado = produto;
    console.log(this.produtoSelecionado)
  }

  desmarcarItem(elemento: any) {

    console.log('NO METODO DESMARCAR ITEM')

    if (elemento.parentNode.className != 'selecionado') return;

    elemento.parentNode.className = 'nao-selecionado';

    this.resetarTexto(this.nomeProduto);
    this.resetarTexto(this.precoVenda);
    this.resetarTexto(this.precoSugerido);
    this.resetarTexto(this.quantidade);

    this.itensForm.get('precoSugerido').disable();
    this.itensForm.get('precoVenda').disable();
    this.itensForm.get('quantidade').disable();
    this.itensForm.get('auxiliar').setValue('');

    this.produtosSelecionados = [];
  }

  private resetarTexto(elemento) {

    elemento.nativeElement.value = '';
  }

  enviarProdutoParaCarrinho() {

    this.produtoSelecionado.valorVenda = this.itensForm.get('precoVenda').value;
    this.produtoSelecionado.quantidade = this.itensForm.get('quantidade').value;

    this.produtoSelecionado.valorFinal = this.produtoSelecionado.valorVenda * this.produtoSelecionado.quantidade;

    console.log(this.produtosSelecionados)
    console.log(this.produtoSelecionado)

    this.enviarProduto.emit(this.produtoSelecionado);
    this.modalService.fecharModal('modalProdutos');
  }
}
