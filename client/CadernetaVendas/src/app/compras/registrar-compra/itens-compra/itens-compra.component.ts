import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Produto } from 'src/app/produtos/models/produto';
import { ProdutoService } from 'src/app/produtos/services/produto.service';

@Component({
  selector: 'cv-itens-compra',
  templateUrl: './itens-compra.component.html',
  styleUrls: ['./itens-compra.component.css']
})
export class ItensCompraComponent implements OnInit {

  @ViewChild('nomeProduto') nomeProduto: ElementRef;

  produtos: Produto[] = [];
  page: number = 1;
  pageSize: number = 5;
  collectionSize = this.produtos.length;

  produtosSelecionados: any[] = [];
  produtoSelecionado: boolean = true;

  itensForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService) { }

  ngOnInit() {

    this.itensForm = this.formBuilder.group({

    });

    this.produtoService.obterProdutos().subscribe(produtos => {
      this.produtos = produtos
      console.log(this.produtos)
    })
  }

  // selecionarItem(elemento: any) /* elemento: ElementRef */ {
  //   let trSelecionada = elemento.parentElement;

  //   console.log(trSelecionada);
  // }

  selecionarItem(elemento: any) /* elemento: ElementRef */ {
    // let trSelecionada = elemento.nativeElement;
    if (this.produtosSelecionados.length != 0) {
      console.log('true')
      this.desmarcarItem(elemento);
      return;
    }
    let nomeProduto = elemento.parentNode.cells[1].innerText;

    // this.produtoSelecionado = !this.produtoSelecionado;
    
        this.nomeProduto.nativeElement.value = nomeProduto;
    
        
        console.log(this.produtosSelecionados.length)


    this.produtosSelecionados.push(elemento.parentNode.cells);

    elemento.parentNode.className = 'selecionado';

  }

  preencherCampoNome(nomeproduto: string) {

  }

  desmarcarItem(elemento: any) {

    if(elemento.parentNode.className!='selecionado'){
      console.log('TRUE DE NOVO')
      return;
    }

    elemento.parentNode.className = 'nao-selecionado';
    this.nomeProduto.nativeElement.value = '';
    this.produtosSelecionados = [];
  }
}
