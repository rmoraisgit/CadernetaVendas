import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator } from 'src/app/utils/genericValidator';

@Component({
  selector: 'cv-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.css']
})
export class AdicionarClienteComponent implements OnInit, AfterViewInit {

  clienteForm: FormGroup;

  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private formBuilder: FormBuilder
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

    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['']
    });
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.clienteForm);
      console.log(this.displayMessage)
    })
  }

}