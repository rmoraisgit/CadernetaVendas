import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'cv-desativar-cliente',
  templateUrl: './desativar-cliente.component.html',
  styleUrls: ['./desativar-cliente.component.css']
})
export class DesativarClienteComponent implements OnInit {

  @Input() cliente: Cliente;

  constructor() { }

  ngOnInit() {
  }

}