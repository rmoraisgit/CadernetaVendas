import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutesModule } from './app.routes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { AlertModule } from './shared/alert/alert.module';
import { ClientesModule } from './clientes/clientes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    CoreModule,
    HomeModule,
    AlertModule,
    ProdutosModule,
    ClientesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
