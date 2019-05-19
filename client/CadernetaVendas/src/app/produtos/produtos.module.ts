import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { VMessageModule } from '../shared/validation-message/vmessage.module';
import { ListEmptyMessageModule } from '../shared/list-empty-message/list-empty-message.module';
import { ChangeColorOnHoverModule } from '../shared/directives/changecolor-on-hover/changecolor-on-hover.module';

@NgModule({
  declarations: [
    AdicionarProdutoComponent,
    ListaProdutosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ChangeColorOnHoverModule,
    CurrencyMaskModule,
    FormsModule,
    VMessageModule,
    ListEmptyMessageModule
  ]
})
export class ProdutosModule { }
