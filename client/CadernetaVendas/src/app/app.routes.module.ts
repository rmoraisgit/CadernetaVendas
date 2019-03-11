import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarProdutoComponent } from './produtos/adicionar-produto/adicionar-produto.component';

const routes: Routes = [
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