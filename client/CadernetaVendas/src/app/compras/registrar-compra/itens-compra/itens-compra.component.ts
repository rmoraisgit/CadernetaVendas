import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit, ViewChildren, Renderer, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { Produto } from 'src/app/produtos/models/produto';
import { ProdutoService } from 'src/app/produtos/services/produto.service';
import { ValidationMessagesItensCompra } from './validation-messages-itens-compra';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cv-itens-compra',
  templateUrl: './itens-compra.component.html',
  styleUrls: ['./itens-compra.component.css']
})
export class ItensCompraComponent implements OnInit {

  @ViewChild('nomeProduto') nomeProduto: ElementRef;
  @ViewChild('precoUnitario') precoUnitario: ElementRef;
  @ViewChild('quantidade') quantidade: ElementRef;
  habilitadoPrecoUnitario: boolean = false;
  habilitadoQuantidade: boolean = false;

  produtos: Produto[] = [];

  page: number = 1;
  pageSize: number = 5;
  collectionSize = this.produtos.length;

  produtosSelecionados: Produto[] = [];
  produtoSelecionado: Produto;

  @Output() enviarProduto: EventEmitter<Produto> = new EventEmitter<Produto>();

  itensForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private produtoService: ProdutoService) { }

  ngOnInit() {

    this.itensForm = this.formBuilder.group({
      produto: [''],
      precoUnitario: [{ value: '', disabled: false }, Validators.required],
      quantidade: [{ value: '', disabled: false }, Validators.required],
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

    const produto: Produto = new Produto();
    produto.id = idProduto;
    produto.nome = nomeProduto;

    this.nomeProduto.nativeElement.value = nomeProduto;

    this.itensForm.get('precoUnitario').enable();
    this.itensForm.get('quantidade').enable();

    this.itensForm.get('precoUnitario').setValidators(Validators.required);
    this.itensForm.get('quantidade').setValidators(Validators.required);

    this.itensForm.get('auxiliar').setValue('x')

    elemento.parentNode.className = 'selecionado';

    this.produtosSelecionados.push(produto);
    this.produtoSelecionado = produto;
    console.log(this.produtoSelecionado)
  }


  desmarcarItem(elemento: any) {

    if (elemento.parentNode.className != 'selecionado') return;

    elemento.parentNode.className = 'nao-selecionado';

    this.resetarTexto(this.nomeProduto);
    this.resetarTexto(this.precoUnitario);
    this.resetarTexto(this.quantidade);

    this.itensForm.get('precoUnitario').disable();
    this.itensForm.get('quantidade').disable();
    this.itensForm.get('auxiliar').setValue('');

    this.produtosSelecionados = [];
  }

  private resetarTexto(elemento) {
    
    elemento.nativeElement.value = '';
  }

  enviarProdutoParaCarrinho() {

    this.produtoSelecionado.valor = this.itensForm.get('precoUnitario').value;
    this.produtoSelecionado.quantidade = this.itensForm.get('quantidade').value;

    console.log(this.produtoSelecionado)

    this.enviarProduto.emit(this.produtoSelecionado);
    this.modalService.dismissAll();
  }
}
