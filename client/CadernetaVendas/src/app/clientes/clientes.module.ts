import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask'

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';
import { VMessageModule } from '../shared/validation-message/vmessage.module';

@NgModule({
  declarations: [
    ListaClientesComponent, 
    AdicionarClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    VMessageModule
  ]
})
export class ClientesModule { }
