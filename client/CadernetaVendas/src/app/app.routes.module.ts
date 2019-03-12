import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarProdutoComponent } from './produtos/adicionar-produto/adicionar-produto.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';

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