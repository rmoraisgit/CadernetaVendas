import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { ClienteService } from '../services/cliente.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Cliente, Endereco } from '../models/cliente';
// import { Endereco } from '../models/endereco';

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
      },
      cep: {
        required: 'O CEP é requerido',
        minlength: 'Informe o CEP em um formato correto',
        maxlength: 'Informe o CEP em um formato correto'
      },
      logradouro: {
        required: 'O logradouro é requerido',
        minlength: 'Informe o logradouro em um formato correto',
        maxlength: 'Informe o logradouro em um formato correto'
      },
      numero: {
        required: 'O número da residência é requerido',
        minlength: 'Informe o número em um formato correto',
        maxlength: 'Informe o número em um formato correto'
      },
      complemento: {
        minlength: 'Informe o complemento em um formato correto',
        maxlength: 'Informe o complemento em um formato correto'
      },
      bairro: {
        required: 'O bairro é requerido',
        minlength: 'Informe o bairro em um formato correto',
        maxlength: 'Informe o bairro em um formato correto'
      },
      cidade: {
        required: 'A cidade é requerido',
        minlength: 'Informe a cidade em um formato correto',
        maxlength: 'Informe a cidade em um formato correto'
      },
      estado: {
        required: 'O estado é requerido',
        minlength: 'Informe o estado em um formato correto',
        maxlength: 'Informe o estado em um formato correto'
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
      logradouro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      complemento: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      bairro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cidade: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
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
    let clienteJSON = {
        nome: cliente.nome,
        cpf: cliente.cpf,
        saldoDevedor: cliente.saldoDevedor,
        telefone: cliente.telefone,
        celular: cliente.celular,
        email: cliente.email,
        endereco: {
          cep: cliente.cep,
          logradouro: cliente.logradouro,
          numero: cliente.numero,
          complemento: cliente.complemento,
          bairro: cliente.bairro,
          cidade: cliente.cidade,
          estado: cliente.estado
        }
    }
    console.log(clienteJSON);
    

    console.log(cliente);

    var response = this.clienteService.adicionarCliente(clienteJSON).subscribe(res => {
      this.alertService.success('Cliente adicionado com sucesso.');
      this.router.navigate(['clientes'])
    });

    console.log(response);
  }

  buscarDadosCEP(cepCliente: string) {

    const cliente = this.clienteForm.getRawValue() as Cliente;

    this.enderecoService.obterEndereco(cepCliente).subscribe(
      res => {
        cliente.endereco = res;
        this.preencherCamposEndereco(cliente.endereco);
      }
    );    
  }

  preencherCamposEndereco(endereco : Endereco){

    console.log(endereco);

    this.clienteForm.get('logradouro').setValue(endereco.logradouro);
    this.clienteForm.get('bairro').setValue(endereco.bairro);
    this.clienteForm.get('complemento').setValue(endereco.complemento);
    this.clienteForm.get('cidade').setValue(endereco.localidade);
    this.clienteForm.get('estado').setValue(endereco.uf);
  }
}