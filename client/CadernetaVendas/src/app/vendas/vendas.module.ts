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
import { ClientesDisponiveisComponent } from './registrar-venda/clientes-disponiveis/clientes-disponiveis.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ListaVendasComponent, 
    RegistrarVendaComponent, ItensVendaComponent, ClientesDisponiveisComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
    ChangeColorOnHoverModule,
    NgbModule,
    CurrencyMaskModule,
    VMessageModule,
    ListEmptyMessageModule,
    ModalModule
  ]
})
export class VendasModule { }
