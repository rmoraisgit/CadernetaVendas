import { Component, OnInit, ElementRef } from '@angular/core';
import { Produto } from 'src/app/produtos/models/produto';
import { ProdutoService } from 'src/app/produtos/services/produto.service';

@Component({
  selector: 'cv-itens-compra',
  templateUrl: './itens-compra.component.html',
  styleUrls: ['./itens-compra.component.css']
})
export class ItensCompraComponent implements OnInit {

  produtos: Produto[] = [];
  page: number = 1;
  pageSize: number = 5;
  collectionSize = this.produtos.length;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {

    this.produtoService.obterProdutos().subscribe(produtos => {
      this.produtos = produtos
      console.log(this.produtos)
    })
  }

  selecionarItem(elemento: any) /* elemento: ElementRef */ {
    let trSelecionada = elemento.parentElement;

    console.log(trSelecionada);
  }

}
