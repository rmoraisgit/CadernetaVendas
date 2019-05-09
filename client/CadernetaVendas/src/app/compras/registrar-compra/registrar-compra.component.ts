import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { validationMessagesCompra } from './validation-messages-compra';
import { ItensCompraComponent } from './itens-compra/itens-compra.component';

@Component({
  selector: 'cv-registrar-compra',
  templateUrl: 'registrar-compra.component.html',
  styleUrls: ['./registrar-compra.component.css']
})
export class RegistrarCompraComponent implements OnInit {

  compraForm: FormGroup;
  closeResult: string;

  produtos: any[] = [];

  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('itensCompra') itensCompra : ItensCompraComponent;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal) {

    this.genericValidator = new GenericValidator(validationMessagesCompra);
  }

  ngOnInit(): void {

    this.compraForm = this.formBuilder.group({
      fornecedor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      total: ['', [Validators.required]]
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  registrar() {

  }

  obterProdutoParaCarrinho() {

    console.log('AAA')

    // this.itensCompraService.obterItem().subscribe(
    //   res => { console.log(res) }
    // )
    // console.log(this.itensCompra.produtosSelecionados);

    console.log(this.produtos)
  }
}