import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.importarArquivoForm = this.formBuilder.group({
      importFile: ['', Validators.required]
    });

    this.produtoForm = this.formBuilder.group({
      importFile: ['', Validators.required],
      Nome: ['', Validators.required]
    });
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  tioR(categoriaSelecionada: string){
    console.log("OI")
    console.log(categoriaSelecionada);

    if(categoriaSelecionada == 'Banho'){
      console.log("OI TIO RAFAEL")

      this.categoriaSelecionada = categoriaSelecionada;

      console.log(categoriaSelecionada)
      
      // this.produtoForm = this.formBuilder.group({
      //   importFile: ['', Validators.required],
      //   Nome: ['', Validators.required]
      // });
    }

  }
}