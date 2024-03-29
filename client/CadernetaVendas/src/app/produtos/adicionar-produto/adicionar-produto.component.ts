import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { pesoValidator } from 'src/app/utils/pesoValidator';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { validationMessagesProduto } from './validation-messages-produto';
import { selectValidator } from 'src/app/utils/selectValidator';

@Component({
  selector: 'cv-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit, AfterViewInit {

  errors: any[] = [];
  produtoForm: FormGroup;
  fileToUpload: File;
  fotoURL: any;
  categoriaSelecionada: string = '';
  imagemForm: any;
  imagemNome: string;

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  @ViewChild('nomeImagem') nomeImagem: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private alertService: AlertService,
    private router: Router) {

    this.genericValidator = new GenericValidator(validationMessagesProduto);
  }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      peso: ['', [Validators.required, pesoValidator]],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      select: ['Selecione...', [selectValidator]]
    });
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.produtoForm);
    })
  }

  // file: File
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

  atualizarForm(categoriaSelecionada: string) {

    switch (categoriaSelecionada) {

      // Categoria: Cama
      case 'f8a495a7-40dd-4e94-85c0-8e203aa8a94a': {

        this.removerTodosControles();

        this.categoriaSelecionada = categoriaSelecionada;

        this.produtoForm.addControl('altura', new FormControl('', Validators.required));
        this.produtoForm.addControl('largura', new FormControl('', Validators.required));

        break;
      }
      // Categoria: Mesa
      case 'c7792c4a-4020-45e4-bc58-6dd4f0cdeb8b': {

        this.removerTodosControles();

        this.categoriaSelecionada = categoriaSelecionada;

        this.produtoForm.addControl('altura', new FormControl('', Validators.required));
        this.produtoForm.addControl('largura', new FormControl('', Validators.required));

        break;
      }
      // Categoria: Panelas
      case '57b328e4-a8e3-4c61-ac95-59e110d2edd8': {

        this.removerTodosControles();

        this.produtoForm.addControl('capacidade', new FormControl('', Validators.required));

        this.categoriaSelecionada = categoriaSelecionada;

        break;
      }
      default:
        this.removerTodosControles();
        this.categoriaSelecionada = '0';
        break;
    }
  }

  removerTodosControles() {

    if (this.produtoForm.get('capacidade') != null)
      this.produtoForm.removeControl('capacidade');

    if (this.produtoForm.get('altura') != null)
      this.produtoForm.removeControl('altura');

    if (this.produtoForm.get('largura') != null)
      this.produtoForm.removeControl('largura');
  }

  adicionar() {

    console.log(this.imagemForm);

    if (this.imagemForm == undefined) {
      this.errors.push("Insira uma imagem para o produto")
      return;
    }

    const produto: Produto = this.produtoForm.getRawValue();
    produto.categoriaId = this.categoriaSelecionada;

    let formdata = new FormData();

    formdata.append('produto', JSON.stringify(produto));
    formdata.append('FormFile', this.imagemForm, this.imagemNome);

    return this.produtoService.adicionarProduto(formdata).subscribe(res => {
      this.alertService.success('Produto adicionado com sucesso.');
      this.router.navigate(['produtos']);
    });
  }

  fecharErros() {
    this.errors = [];
  }
}