import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'cv-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {

  produtoForm: FormGroup;
  importarArquivoForm: FormGroup;
  fileToUpload: File;
  fotoURL: any;
  categoriaSelecionada: string = '';
  precoValido: boolean = true;

  @ViewChild('labelImport') labelImport: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService) { }

  ngOnInit() {

    this.importarArquivoForm = this.formBuilder.group({
      importFile: ['', Validators.required]
    });

    this.produtoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      peso: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  onFileChange(file: File) {
    this.labelImport.nativeElement.innerText = file.name;
    this.fileToUpload = file;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.fotoURL = reader.result;
    }
  }

  atualizarForm(categoriaSelecionada: string) {
    console.log(categoriaSelecionada);

    switch (categoriaSelecionada) {

      // Categoria: Cama
      case 'f8a495a7-40dd-4e94-85c0-8e203aa8a94a': {
        this.categoriaSelecionada = categoriaSelecionada;

        this.produtoForm.addControl('altura', new FormControl('', Validators.required));
        this.produtoForm.addControl('largura', new FormControl('', Validators.required));
        break;
      }
      // Categoria: Mesa
      case 'c7792c4a-4020-45e4-bc58-6dd4f0cdeb8b': {
        this.categoriaSelecionada = categoriaSelecionada;

        this.produtoForm.addControl('altura', new FormControl('', Validators.required));
        this.produtoForm.addControl('largura', new FormControl('', Validators.required));
        break;
      }
      // Categoria: Panelas
      case '57b328e4-a8e3-4c61-ac95-59e110d2edd8': {
        this.produtoForm.addControl('capacidade', new FormControl('', Validators.required));

        this.categoriaSelecionada = categoriaSelecionada;
        break;
      }
      default:
        this.categoriaSelecionada = '0';
        break;
    }
  }

  adicionar() {
    const produto: Produto = this.produtoForm.getRawValue();

    console.log(produto);
    console.log(produto.capacidade);

    let resultado = this.produtoService.adicionarProduto(produto.nome, produto.valor, produto.peso, produto.descricao, this.categoriaSelecionada, this.fileToUpload, produto.altura, produto.largura, produto.capacidade);

    console.log(resultado.subscribe());
  }

  verificarPrecoValido(event: string): void {
    const conteudoEvento: string[] = event.split(' ');
    const precoCorreto: string = conteudoEvento[1];

    const conteudoPreco: string[] = precoCorreto.split(',');
    const precoFormatoCorreto: string = conteudoPreco[0].replace('.', '');
    const precoCentavos: string = conteudoPreco[1];

    if (+precoFormatoCorreto >= 50000 && +precoCentavos > 0) this.precoValido = false;
    else this.precoValido = true;
  }
}