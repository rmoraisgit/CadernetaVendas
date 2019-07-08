import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto, Kardex } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { FormControlName } from '@angular/forms';

@Component({
    templateUrl: './detalhes.produto.component.html',
    styleUrls: ['./detalhes.produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

    produto: Produto;
    // kardex: Kardex[] = []
    fotoURL: any;
    imagemForm: any;
    imagemNome: string;
    imageBase64: any;
    activatedAngleDown: boolean = true;

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    @ViewChild('nomeImagem') nomeImagem: ElementRef;

    constructor(
                private route: ActivatedRoute,
                private produtoService: ProdutoService) { }

    ngOnInit(): void {
        const idProduto = this.route.snapshot.params.produtoId;

        this.produtoService.obterProdutoPorId(idProduto)
            .subscribe(produto => {
                this.produto = produto;
                this.fotoURL = "data:image/png;base64," + this.produto.foto;
                this.produto.kardex = produto.kardex;
                console.log(this.produto);
            });
    }

    uploadFoto(file: any) {

        if (file.length == 0) return;

        this.imagemForm = file[0];
        this.imagemNome = file[0].name;
        this.nomeImagem.nativeElement.innerText = file[0].name

        this.atualizarFotoExibicao(file[0]);
    }

    // file: File
    atualizarFotoExibicao(file: any) {

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.fotoURL = reader.result;
        }
    }

    alterarDireacaoIconeSeta() {
        if (this.activatedAngleDown) {
            this.activatedAngleDown = false;
            return;
        }
        this.activatedAngleDown = true;
    }
}