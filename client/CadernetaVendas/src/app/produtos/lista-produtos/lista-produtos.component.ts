import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cv-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  produtos: Produto[] = [];

  page: number = 1;
  pageSize: number = 5;
  collectionSize = this.produtos.length;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.produtos = this.activatedRoute.snapshot.data["produtos"];
    console.log(this.produtos)
    console.log(this.produtos[0].foto)
    this.produtos.forEach(produto => {
      produto.foto = "data:image/png;base64," + produto.foto
    });
  }
}