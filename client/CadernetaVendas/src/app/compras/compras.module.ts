import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RegistrarCompraComponent } from './registrar-compra/registrar-compra.component';
import { ItensCompraComponent } from './registrar-compra/itens-compra/itens-compra.component';
import { VMessageModule } from '../shared/validation-message/vmessage.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    VMessageModule
  ],
  exports: [
    RegistrarCompraComponent
  ]
})
export class ComprasModule { }
