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

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.produtos = this.activatedRoute.snapshot.data["produtos"];
  }
}
