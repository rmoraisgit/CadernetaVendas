import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { Produto, Categoria } from '../models/produto';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { pesoValidator } from 'src/app/utils/pesoValidator';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { selectValidator } from 'src/app/utils/selectValidator';
import { validationMessagesProduto } from '../adicionar-produto/validation-messages-produto';

@Component({
  selector: 'cv-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;

  categorias: Categoria[] =
    [
      { id: "f8a495a7-40dd-4e94-85c0-8e203aa8a94a", nome: "Cama" },
      { id: 'c7792c4a-4020-45e4-bc58-6dd4f0cdeb8b', nome: 'Mesa' },
      { id: "57b328e4-a8e3-4c61-ac95-59e110d2edd8", nome: "Cozinha" }
    ]

  errors: any[] = [];
  produtoForm: FormGroup;
  fileToUpload: File;
  fotoURL: any;
  categoriaSelecionada: string = '';
  imagemForm: any;
  imagemNome: string;;

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  @ViewChild('nomeImagem') nomeImagem: ElementRef;
  @ViewChild('selectCategorias') selectCategorias: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) {

    this.genericValidator = new GenericValidator(validationMessagesProduto);
  }

  ngOnInit() {
    const idProduto = this.route.snapshot.params.produtoId;

    this.produtoService.obterProdutoPorId(idProduto)
      .subscribe(produto => {
        this.produto = produto;
        this.fotoURL = "data:image/png;base64," + this.produto.foto;
        this.produto.kardex = produto.kardex;
        this.preencherFormComDadosProduto();
        console.log(this.produto);
        this.produtoForm.addControl('select', new FormControl(this.categoriaSelecionada))
        this.categoriaSelecionada = produto.categoriaId;
        this.atualizarForm(produto.categoriaId);
      });
  }

  preencherFormComDadosProduto() {

    let teste = new FormControl(this.categorias[0].nome, selectValidator);

    this.produtoForm = this.formBuilder.group({
      nome: [this.produto.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      peso: [this.produto.peso, [Validators.required, pesoValidator]],
      descricao: [this.produto.descricao, [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      select: [new FormControl(this.categorias), [selectValidator]]
    });

    this.produtoForm.get('select').setValue(this.preencherCategoriaComDadosProduto(this.produto.categoriaId))
  }

  preencherCategoriaComDadosProduto(idCategoria: string) {
    console.log(idCategoria);

    switch (idCategoria) {

      // Categoria: Cama
      case 'f8a495a7-40dd-4e94-85c0-8e203aa8a94a':
        return 'f8a495a7-40dd-4e94-85c0-8e203aa8a94a';

      // Categoria: Mesa
      case 'c7792c4a-4020-45e4-bc58-6dd4f0cdeb8b':
        return 'c7792c4a-4020-45e4-bc58-6dd4f0cdeb8b';

      // Categoria: Panelas
      case '57b328e4-a8e3-4c61-ac95-59e110d2edd8':
        return '57b328e4-a8e3-4c61-ac95-59e110d2edd8'

      default:
        return '0'
    }
  }

  definirValoresIniciais() {

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

    console.log(categoriaSelecionada);
    switch (categoriaSelecionada) {

      // Categoria: Cama
      case 'f8a495a7-40dd-4e94-85c0-8e203aa8a94a': {

        this.removerTodosControles();

        this.categoriaSelecionada = categoriaSelecionada;

        this.produtoForm.addControl('altura', new FormControl('', Validators.required));
        this.produtoForm.addControl('largura', new FormControl('', Validators.required));

        this.produtoForm.get('altura').setValue(this.produto.altura);
        this.produtoForm.get('largura').setValue(this.produto.largura);

        break;
      }
      // Categoria: Mesa
      case 'c7792c4a-4020-45e4-bc58-6dd4f0cdeb8b': {

        console.log('SOU 1 MESA')

        this.removerTodosControles();

        this.categoriaSelecionada = categoriaSelecionada;

        this.produtoForm.addControl('altura', new FormControl('', Validators.required));
        this.produtoForm.addControl('largura', new FormControl('', Validators.required));

        this.produtoForm.get('altura').setValue(this.produto.altura);
        this.produtoForm.get('largura').setValue(this.produto.largura);

        break;
      }
      // Categoria: Panelas
      case '57b328e4-a8e3-4c61-ac95-59e110d2edd8': {

        this.removerTodosControles();

        this.categoriaSelecionada = categoriaSelecionada;

        this.produtoForm.addControl('capacidade', new FormControl('', Validators.required));

        this.produtoForm.get('capacidade').setValue(this.produto.capacidade);

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
