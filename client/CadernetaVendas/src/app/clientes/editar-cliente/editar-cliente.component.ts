import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GenericValidator } from 'src/app/utils/genericValidator';
import { ClienteService } from '../services/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { Cliente, Endereco } from '../models/cliente';
import { validationMessagesCliente } from '../validation-messages-cliente';

@Component({
  selector: 'cv-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit, AfterViewInit {

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
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private alertService: AlertService
  ) {

    this.genericValidator = new GenericValidator(validationMessagesCliente);
  }

  ngOnInit(): void {
    const clienteId = this.route.snapshot.params.clienteId;

    this.clienteService.obterClientePorId(clienteId)
      .subscribe(cliente => {
        console.log(cliente);
        this.cliente = cliente;
        console.log(this.cliente);
        this.preencherFormComDadosProduto();
      });
  }

  private preencherFormComDadosProduto() {

    this.clienteForm = this.formBuilder.group({
      nome: [this.cliente.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: [this.cliente.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      telefone: [this.cliente.telefone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      celular: [this.cliente.celular, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: [this.cliente.email, [Validators.required, Validators.email]],
      cep: [this.cliente.endereco.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      logradouro: [this.cliente.endereco.logradouro, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      numero: [this.cliente.endereco.numero, [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      complemento: [this.cliente.endereco.complemento, [Validators.minLength(2), Validators.maxLength(150)]],
      bairro: [this.cliente.endereco.bairro, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cidade: [this.cliente.endereco.cidade, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      estado: [this.cliente.endereco.estado, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    });
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.clienteForm);
    })
  }

  atualizarCliente() {
    const cliente = this.montarObjetoCliente();
    cliente.id = this.cliente.id;
    cliente.ativo = this.cliente.ativo;
    cliente.saldoDevedor = this.cliente.saldoDevedor;
    cliente.dataCadastro = this.cliente.dataCadastro;
    cliente.endereco.id = this.cliente.endereco.id;

    this.clienteService.atualizarCliente(cliente)
      .subscribe( success => {
        this.alertService.success('Cliente atualizado com sucesso.');
        this.router.navigate(['clientes', 'detalhes', cliente.id]);
      });
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

}
