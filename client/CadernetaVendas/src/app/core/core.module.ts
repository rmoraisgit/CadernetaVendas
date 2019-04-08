import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../shared/alert/alert.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule, 
    RouterModule,
    AlertModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
