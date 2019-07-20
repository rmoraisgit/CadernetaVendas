import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask'

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';
import { VMessageModule } from '../shared/validation-message/vmessage.module';
import { ListEmptyMessageModule } from '../shared/list-empty-message/list-empty-message.module';
import { ChangeColorOnHoverModule } from '../shared/directives/changecolor-on-hover/changecolor-on-hover.module';
import { DetalhesClienteComponent } from './detalhes-cliente/detalhes-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { RegistroPagamentoComponent } from './registro-pagamento/registro-pagamento.component';
import { ModalModule } from '../shared/modal/modal.module';

@NgModule({
  declarations: [
    ListaClientesComponent, 
    AdicionarClienteComponent, 
    DetalhesClienteComponent, 
    EditarClienteComponent, 
    RegistroPagamentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ChangeColorOnHoverModule,
    NgxMaskModule.forRoot(),
    VMessageModule,
    ListEmptyMessageModule,
    ModalModule
  ]
})
export class ClientesModule { }
