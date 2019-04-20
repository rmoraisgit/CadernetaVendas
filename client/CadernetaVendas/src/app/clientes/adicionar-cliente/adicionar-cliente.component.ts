import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { ClienteService } from '../services/cliente.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'cv-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.css']
})
export class AdicionarClienteComponent implements OnInit, AfterViewInit {

  cepCliente: string = '';

  clienteForm: FormGroup;

  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.validationMessages = {
      nome: {
        required: 'O nome é requerido',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'O CPF é requerido',
        minlength: 'Informe o CPF em um formato correto',
        maxlength: 'Informe o CPF em um formato correto'
      },
      telefone: {
        required: 'O telefone é requerido',
        minlength: 'Informe o telefone em um formato correto',
        maxlength: 'Informe o telefone em um formato correto'
      },
      celular: {
        required: 'O celular é requerido',
        minlength: 'Informe o celular em um formato correto',
        maxlength: 'Informe o celular em um formato correto'
      },
      email: {
        required: 'O email é requerido',
        email: 'Informe o email em um formato correto'
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      celular: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
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

  adicionar() {
    const cliente = this.clienteForm.getRawValue();

    console.log(cliente);

    var response = this.clienteService.adicionarCliente(cliente).subscribe(res => {
      this.alertService.success('Cliente adicionado com sucesso.')
    });

    console.log(response);
  }

  buscarDadosCEP(cepCliente:string){

    var response = this.enderecoService.obterEndereco(cepCliente).subscribe(
      res => {
        console.log(res);
      }
    );
    console.log("TIO TAFAEL")
    console.log(cepCliente)
  }

}