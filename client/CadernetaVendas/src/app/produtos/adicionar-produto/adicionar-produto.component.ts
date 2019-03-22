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
  fileToUpload: File = null;

  categoriaSelecionada: string = '';

  @ViewChild('labelImport')
  labelImport: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private produtoService: ProdutoService) { }

  ngOnInit() {

    this.importarArquivoForm = this.formBuilder.group({
      importFile: ['', Validators.required]
    });

    this.produtoForm = this.formBuilder.group({
      // importFile: ['', Validators.required],
      Nome: ['', Validators.required],
      Preco: ['', Validators.required],
      Peso: ['', Validators.required]
    });
  }

  // onFileChange(files: FileList) {
  //   this.labelImport.nativeElement.innerText = Array.from(files)
  //     .map(f => f.name)
  //     .join(', ');
  //   this.fileToUpload = files.item(0);
  // }

  onFileChange(file: File) {
    this.labelImport.nativeElement.innerText = file.name;
    this.fileToUpload = file;

    console.log(file)
  }

  atualizarForm(categoriaSelecionada: string) {
    console.log(categoriaSelecionada);

    switch (categoriaSelecionada) {

      case 'f8a495a7-40dd-4e94-85c0-8e203aa8a94a': {
        this.categoriaSelecionada = categoriaSelecionada;

        this.produtoForm.addControl('Altura', new FormControl('', Validators.required));
        this.produtoForm.addControl('Largura', new FormControl('', Validators.required));
        break;
      }
      case 'c7792c4a-4020-45e4-bc58-6dd4f0cdeb8b': {
        this.categoriaSelecionada = categoriaSelecionada;
        break;
      }
      case '57b328e4-a8e3-4c61-ac95-59e110d2edd8': {
        this.categoriaSelecionada = categoriaSelecionada;
        break;
      }
      default:
        this.categoriaSelecionada = '0';
        break;
    }
  }

  adicionar(){

    console.log("TESTE POST TOOP");
    

    let produto: Produto = this.produtoForm.getRawValue();
    console.log(produto);

    let a = this.produtoService.adicionarProduto(produto);

    console.log(a.subscribe());
    
  }
}