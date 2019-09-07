import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../shared/alert/alert.module';
import { FooterComponent } from './footer/footer.component';
import { ChangeColorOnHoverModule } from '../shared/directives/changecolor-on-hover/changecolor-on-hover.module';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    AlertModule,
    ChangeColorOnHoverModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NaoAutorizadoComponent
  ]
})
export class CoreModule { }
