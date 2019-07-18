import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { ClienteService } from '../services/cliente.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Cliente, Endereco } from '../models/cliente';
import { validationMessagesCliente } from '../validation-messages-cliente';
// import { Endereco } from '../models/endereco';

@Component({
  selector: 'cv-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.css']
})
export class AdicionarClienteComponent implements OnInit, AfterViewInit {

  cliente: Cliente;
  errors: any[] = [];
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

    this.genericValidator = new GenericValidator(validationMessagesCliente);
    this.cliente = new Cliente();
    this.cliente.endereco = new Endereco();
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
    })
  }

  adicionar() {

    this.cliente = this.montarObjetoCliente();

    this.clienteService.adicionarCliente(this.cliente).subscribe(
      res => {
        this.alertService.success('Cliente adicionado com sucesso.');
        this.router.navigate(['clientes'])
      },
      fail => { console.log(fail); this.errors = fail.error.errors }
    );
  }

  private montarObjetoCliente(): Cliente {

    const cliente: Cliente = new Cliente();
    cliente.nome = this.clienteForm.get('nome').value;
    cliente.cpf = this.clienteForm.get('cpf').value;
    cliente.telefone = this.clienteForm.get('telefone').value;
    cliente.celular = this.clienteForm.get('celular').value;
    cliente.email = this.clienteForm.get('email').value;
    cliente.endereco.cep = this.clienteForm.get('cep').value;
    cliente.endereco.logradouro = this.clienteForm.get('logradouro').value;
    cliente.endereco.numero = this.clienteForm.get('numero').value;
    cliente.endereco.complemento = this.clienteForm.get('complemento').value;
    cliente.endereco.bairro = this.clienteForm.get('bairro').value;
    cliente.endereco.cidade = this.clienteForm.get('cidade').value;
    cliente.endereco.estado = this.clienteForm.get('estado').value;

    return cliente;
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

  preencherCamposEndereco(endereco: Endereco) {

    this.clienteForm.get('logradouro').setValue(endereco.logradouro);
    this.clienteForm.get('bairro').setValue(endereco.bairro);
    this.clienteForm.get('complemento').setValue(endereco.complemento);
    this.clienteForm.get('cidade').setValue(endereco.localidade);
    this.clienteForm.get('estado').setValue(endereco.uf);
  }

  fecharErros() {
    this.errors = [];
  }
}