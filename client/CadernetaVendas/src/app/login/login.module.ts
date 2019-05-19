import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChangeColorOnHoverModule } from '../shared/directives/changecolor-on-hover/changecolor-on-hover.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChangeColorOnHoverModule
  ]
})
export class LoginModule { }
