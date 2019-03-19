import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdicionarProdutoComponent,
    ListaProdutosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProdutosModule { }
