import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { VMessageModule } from '../shared/validation-message/vmessage.module';

@NgModule({
  declarations: [
    AdicionarProdutoComponent,
    ListaProdutosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    FormsModule,
    VMessageModule
  ]
})
export class ProdutosModule { }
