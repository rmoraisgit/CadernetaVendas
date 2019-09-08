import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarProdutoComponent } from './produtos/adicionar-produto/adicionar-produto.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { AdicionarClienteComponent } from './clientes/adicionar-cliente/adicionar-cliente.component';
import { RegistrarCompraComponent } from './compras/registrar-compra/registrar-compra.component';
import { ListaComprasComponent } from './compras/lista-compras/lista-compras.component';
import { LoginComponent } from './login/login/login.component';
import { ListaProdutosResolver } from './produtos/lista-produtos/lista-produtos.resolver';
import { ListaVendasComponent } from './vendas/lista-vendas/lista-vendas.component';
import { RegistrarVendaComponent } from './vendas/registrar-venda/registrar-venda.component';
import { DetalhesProdutoComponent } from './produtos/detalhes-produto/detalhes.produto.component';
import { EditarProdutoComponent } from './produtos/editar-produto/editar-produto.component';
import { DetalhesClienteComponent } from './clientes/detalhes-cliente/detalhes-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'produtos',
        component: ListaProdutosComponent
        // resolve: {
        //     produtos: ListaProdutosResolver
        // }
    },
    {
        path: 'produtos/adicionar',
        component: AdicionarProdutoComponent
    },
    {
        path: 'produtos/detalhes/:produtoId',
        component: DetalhesProdutoComponent
    },
    {
        path: 'produtos/editar/:produtoId',
        component: EditarProdutoComponent
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
        path: 'clientes/detalhes/:clienteId',
        component: DetalhesClienteComponent
    },
    {
        path: 'clientes/editar/:clienteId',
        component: EditarClienteComponent
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
        component: ListaVendasComponent
    },
    {
        path: 'vendas/registrar',
        component: RegistrarVendaComponent
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