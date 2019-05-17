import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarProdutoComponent } from './produtos/adicionar-produto/adicionar-produto.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { AdicionarClienteComponent } from './clientes/adicionar-cliente/adicionar-cliente.component';
import { RegistrarCompraComponent } from './compras/registrar-compra/registrar-compra.component';
import { ListaComprasComponent } from './compras/lista-compras/lista-compras.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'produtos',
        component: ListaProdutosComponent
    },
    {
        path: 'produtos/adicionar',
        component: AdicionarProdutoComponent
    },
    {
        path: 'clientes',
        component: ListaClientesComponent
    },
    {
        path: 'clientes/adicionar',
        component: AdicionarClienteComponent
    },
    {
        path: 'compras',
        component: ListaComprasComponent
    },
    {
        path: 'compras/registrar',
        component: RegistrarCompraComponent
    },
    {
        path: 'vendas',
        component: ListaComprasComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutesModule { }