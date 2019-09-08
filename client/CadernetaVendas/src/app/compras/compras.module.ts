import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import pt from '@angular/common/locales/pt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { RegistrarCompraComponent } from './registrar-compra/registrar-compra.component';
import { ItensCompraComponent } from './registrar-compra/itens-compra/itens-compra.component';
import { VMessageModule } from '../shared/validation-message/vmessage.module';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { ListEmptyMessageModule } from '../shared/list-empty-message/list-empty-message.module';
import { ChangeColorOnHoverModule } from '../shared/directives/changecolor-on-hover/changecolor-on-hover.module';
import { ModalModule } from '../shared/modal/modal.module';
import { CoreModule } from '../core/core.module';

registerLocaleData(pt, 'pt-BR');

@NgModule({
  declarations: [
    ListaComprasComponent,
    RegistrarCompraComponent, 
    ItensCompraComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChangeColorOnHoverModule,
    CoreModule,
    NgbModule,
    CurrencyMaskModule,
    VMessageModule,
    ListEmptyMessageModule,
    ModalModule
  ],
  exports: [
    RegistrarCompraComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ]
})
export class ComprasModule { }
