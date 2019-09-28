import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'cv-extrato-cliente',
  templateUrl: './extrato-cliente.component.html',
  styleUrls: ['./extrato-cliente.component.css']
})
export class ExtratoClienteComponent implements OnInit {

  @Input() cliente: Cliente;

  constructor() { }

  ngOnInit() {
  }

}
