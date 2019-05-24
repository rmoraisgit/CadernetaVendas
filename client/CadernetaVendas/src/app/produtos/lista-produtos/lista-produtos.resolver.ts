import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Injectable({ providedIn: 'root' })
export class ListaProdutosResolver implements Resolve<Observable<Produto[]>> {

    constructor(private produtoService: ProdutoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.produtoService.obterProdutos();
    }
}