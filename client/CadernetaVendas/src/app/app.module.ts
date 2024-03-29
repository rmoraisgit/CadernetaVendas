import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from './core/core.module';
import { AppRoutesModule } from './app.routes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { HomeModule } from './home/home.module';
import { AlertModule } from './shared/alert/alert.module';
import { ClientesModule } from './clientes/clientes.module';
import { ComprasModule } from './compras/compras.module';
import { LoginModule } from './login/login.module';
import { VendasModule } from './vendas/vendas.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    NgbModule,
    CoreModule,
    LoginModule,
    HomeModule,
    AlertModule,
    ProdutosModule,
    ClientesModule,
    VendasModule,
    ComprasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
