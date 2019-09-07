import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cv-nao-autorizado',
  templateUrl: './nao-autorizado.component.html',
  styleUrls: ['./nao-autorizado.component.css']
})
export class NaoAutorizadoComponent implements OnInit {

  @Input() nomeConteudo: string = '';

  constructor() { }

  ngOnInit() {
  }

}
