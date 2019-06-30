import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
    templateUrl: './detalhes.produto.component.html'
})
export class DetalhesProdutoComponent implements OnInit{
    
    produto: Produto;

    constructor(private route: ActivatedRoute,
                private produtoService: ProdutoService){}
    
    ngOnInit(): void {
        const idProduto = this.route.snapshot.params.produtoId;

        this.produtoService.obterProdutoPorId(idProduto)
                .subscribe(produto => console.log(produto))
    } 

}