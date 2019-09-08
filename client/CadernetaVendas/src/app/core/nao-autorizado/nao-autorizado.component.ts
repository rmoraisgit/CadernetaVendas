import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cv-nao-autorizado',
  templateUrl: './nao-autorizado.component.html',
  styleUrls: ['./nao-autorizado.component.css']
})
export class NaoAutorizadoComponent implements OnInit {

  @Input() nomeConteudo: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
