import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { NgbModule, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../shared/modal/modal.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';
import { VMessageModule } from '../shared/validation-message/vmessage.module';
import { ListEmptyMessageModule } from '../shared/list-empty-message/list-empty-message.module';
import { ChangeColorOnHoverModule } from '../shared/directives/changecolor-on-hover/changecolor-on-hover.module';
import { DetalhesClienteComponent } from './detalhes-cliente/detalhes-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { RegistroPagamentoComponent } from './registro-pagamento/registro-pagamento.component';
import { I18n, CustomDatepickerI18n } from '../utils/customDatepickerI18n';
import { NgbDatePTParserFormatter } from '../utils/ngbDatePTParserFormatter';


@NgModule({
  declarations: [
    ListaClientesComponent,
    AdicionarClienteComponent,
    DetalhesClienteComponent,
    EditarClienteComponent,
    RegistroPagamentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    CurrencyMaskModule,
    ChangeColorOnHoverModule,
    NgxMaskModule.forRoot(),
    VMessageModule,
    ListEmptyMessageModule,
    ModalModule
  ],
  providers: [
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    [{ provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter }],
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ]
})
export class ClientesModule { }
