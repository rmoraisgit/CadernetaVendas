import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';

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
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
