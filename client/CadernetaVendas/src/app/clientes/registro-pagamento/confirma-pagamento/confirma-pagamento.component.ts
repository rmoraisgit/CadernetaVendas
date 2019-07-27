import { Component, OnInit, Input } from '@angular/core';
import { Pagamento } from '../pagamento';

@Component({
  selector: 'cv-confirma-pagamento',
  templateUrl: './confirma-pagamento.component.html',
  styleUrls: ['./confirma-pagamento.component.css']
})
export class ConfirmaPagamentoComponent implements OnInit {

  @Input() dadosPagamento: Pagamento;

  constructor() { }

  ngOnInit() {
    
  }
}
