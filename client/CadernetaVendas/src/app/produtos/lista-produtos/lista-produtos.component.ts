import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserTokenService } from 'src/app/core/user-token/user-token.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'cv-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  usuarioAutorizado: boolean = false;

  page: number = 1;
  pageSize: number = 5;
  collectionSize = this.produtos.length;

  constructor(private userTokenService: UserTokenService,
    private produtosService: ProdutoService) { }

  ngOnInit() {
    if (this.userTokenService.hasAccessToken()) {

      this.usuarioAutorizado = true;

      // this.produtos = this.activatedRoute.snapshot.data["produtos"];
      this.produtosService.obterProdutos().subscribe(produtos => {
        this.produtos = produtos;
        this.exibirFotoProdutos(this.produtos);
      });
    }
  }

  private exibirFotoProdutos(produtos: Produto[]) {
    this.produtos.forEach(produto => {
      produto.foto = "data:image/png;base64," + produto.foto
    });
  }
}