import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarCompraComponent } from './registrar-compra/registrar-compra.component';

@NgModule({
  declarations: [RegistrarCompraComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RegistrarCompraComponent
  ]
})
export class ComprasModule { }
