import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RegistrarCompraComponent } from './registrar-compra/registrar-compra.component';
import { ItensCompraComponent } from './registrar-compra/itens-compra/itens-compra.component';
import { VMessageModule } from '../shared/validation-message/vmessage.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import pt from '@angular/common/locales/pt';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { ListEmptyMessageModule } from '../shared/list-empty-message/list-empty-message.module';

registerLocaleData(pt, 'pt-BR');

@NgModule({
  declarations: [
    ListaComprasComponent,
    RegistrarCompraComponent, 
    ItensCompraComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    CurrencyMaskModule,
    VMessageModule,
    ListEmptyMessageModule
  ],
  exports: [
    RegistrarCompraComponent
  ]
})
export class ComprasModule { }
