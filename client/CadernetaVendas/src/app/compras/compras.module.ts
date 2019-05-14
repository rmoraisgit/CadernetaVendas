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

registerLocaleData(pt, 'pt-BR');

@NgModule({
  declarations: [
    RegistrarCompraComponent, 
    ItensCompraComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    CurrencyMaskModule,
    VMessageModule
  ],
  exports: [
    RegistrarCompraComponent
  ]
})
export class ComprasModule { }
