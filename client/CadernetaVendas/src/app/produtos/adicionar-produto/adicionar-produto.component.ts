import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { moedaValidator } from 'src/app/utils/moedaValidator';
import { pesoValidator } from 'src/app/utils/pesoValidator';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'cv-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit, AfterViewInit {

  produtoForm: FormGroup;
  fileToUpload: File;
  fotoURL: any;
  categoriaSelecionada: string = '';
  precoValido: boolean = true;

  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  @ViewChild('labelImport') labelImport: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private alertService: AlertService,
    private router: Router
    ) {

    this.validationMessages = {
      nome: {
        required: 'O nome é requerido',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      valor: {
        required: 'O preço é requerido',
        maxValorMoeda: 'O valor máximo de um novo produto é de R$50.000,00'
      },
      peso: {
        required: 'O peso é requerido',
        minlength: 'A descrição precisa ter no mínimo 10 caracteres',
        maxlength: 'A descrição precisa ter no mínimo 300 caracteres'
      },
      descricao: {
        required: 'A descrição é requerida',
        minlength: 'A descrição precisa ter no mínimo 10 caracteres',
        maxlength: 'A descrição precisa ter no mínimo 300 caracteres'
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      valor: ['', [Validators.required, moedaValidator]],
      peso: ['', [Validators.required, pesoValidator]],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]]
    });
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.produtoForm);
      console.log(this.displayMessage)
    })
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

    this.produtoService.adicionarProduto(produto.nome, produto.valor, produto.peso, produto.descricao, this.categoriaSelecionada, this.fileToUpload, produto.altura, produto.largura, produto.capacidade)
                        .subscribe(res => {
                          this.alertService.success('Produto adicionado com sucesso.');
                          this.router.navigate(['produtos'])
                        });

  }
}