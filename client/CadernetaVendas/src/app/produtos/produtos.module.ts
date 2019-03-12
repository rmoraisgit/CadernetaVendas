import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';

@NgModule({
  declarations: [
    AdicionarProdutoComponent,
    ListaProdutosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProdutosModule { }
