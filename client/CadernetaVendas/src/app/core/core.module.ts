import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../shared/alert/alert.module';
import { FooterComponent } from './footer/footer.component';
import { ChangeColorOnHoverModule } from '../shared/directives/changecolor-on-hover/changecolor-on-hover.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule, 
    RouterModule,
    AlertModule,
    ChangeColorOnHoverModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
