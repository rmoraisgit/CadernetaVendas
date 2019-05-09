import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit, ViewChildren, Renderer, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { Produto } from 'src/app/produtos/models/produto';
import { ProdutoService } from 'src/app/produtos/services/produto.service';
import { ValidationMessagesItensCompra } from './validation-messages-itens-compra';

@Component({
  selector: 'cv-itens-compra',
  templateUrl: './itens-compra.component.html',
  styleUrls: ['./itens-compra.component.css']
})
export class ItensCompraComponent implements OnInit, AfterViewInit {

  @ViewChild('nomeProduto') nomeProduto: ElementRef;
  @ViewChild('precoUnitario') precoUnitario: ElementRef;
  @ViewChild('quantidade') quantidade: ElementRef;
  @ViewChild('tioR') tioR: ElementRef
  habilitadoPrecoUnitario: boolean = false;
  habilitadoQuantidade: boolean = false;

  produtos: Produto[] = [];
  page: number = 1;
  pageSize: number = 5;
  collectionSize = this.produtos.length;

  @Input() produtosSelecionados: any[] = [];
  produtoSelecionado: boolean = true;

  @Output() enviarProduto: EventEmitter<Produto[]> = new EventEmitter<Produto[]>();

  itensForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService) {
    this.genericValidator = new GenericValidator(ValidationMessagesItensCompra);
  }

  ngOnInit() {

    this.itensForm = this.formBuilder.group({
      // produto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      // precoUnitario: [{ value: '', disabled: true }, Validators.required],
      // quantidade: [{ value: '', disabled: true }, Validators.required]
      produto: [''],
      precoUnitario: [{ value: '', disabled: true }],
      quantidade: [{ value: '', disabled: true }]
    });

    this.produtoService.obterProdutos().subscribe(produtos => {
      this.produtos = produtos
      console.log(this.produtos)
    })
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.itensForm);
      console.log(this.displayMessage)
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

    elemento.parentNode.className = 'selecionado';

    // this.produtosSelecionados.push(elemento.parentNode.cells);
    this.produtosSelecionados.push(produto);

    // this.enviarProduto.emit(this.produtosSelecionados);
  }


  desmarcarItem(elemento: any) {

    if (elemento.parentNode.className != 'selecionado') {
      console.log('TRUE DE NOVO')
      return;
    }

    elemento.parentNode.className = 'nao-selecionado';

    this.resetarTexto(this.nomeProduto);
    this.resetarTexto(this.precoUnitario);
    this.resetarTexto(this.quantidade);



    this.itensForm.get('precoUnitario').disable();
    this.itensForm.get('quantidade').disable();

    // this.itensForm.reset();
    // this.itensForm.clearValidators();
    // this.itensForm.clearAsyncValidators();

    // this.itensForm.get('precoUnitario').clearValidators();
    // this.itensForm.get('precoUnitario').reset();
    // this.itensForm.get('precoUnitario').updateValueAndValidity();

    console.log(this.tioR)

    this.produtosSelecionados = [];
  }

  private resetarTexto(elemento) {
    elemento.nativeElement.value = '';
  }

  enviarProdutoParaCarrinho() {
    this.enviarProduto.emit(this.produtosSelecionados);
  }
}
