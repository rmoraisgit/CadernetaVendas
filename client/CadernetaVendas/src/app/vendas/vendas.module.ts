import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/validation-message/vmessage.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ListEmptyMessageModule } from '../shared/list-empty-message/list-empty-message.module';
import { ChangeColorOnHoverModule } from '../shared/directives/changecolor-on-hover/changecolor-on-hover.module';
import { ModalModule } from '../shared/modal/modal.module';
import { ListaVendasComponent } from './lista-vendas/lista-vendas.component';
import { RegistrarVendaComponent } from './registrar-venda/registrar-venda.component';
import { ItensVendaComponent } from './registrar-venda/itens-venda/itens-venda.component';

@NgModule({
  declarations: [
    ListaVendasComponent, 
    RegistrarVendaComponent, ItensVendaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ChangeColorOnHoverModule,
    NgbModule,
    CurrencyMaskModule,
    VMessageModule,
    ListEmptyMessageModule,
    ModalModule
  ]
})
export class VendasModule { }
