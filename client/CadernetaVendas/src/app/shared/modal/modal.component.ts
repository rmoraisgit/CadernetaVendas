import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'cv-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() tituloModal: string = '';

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  fecharModal(modal) {
    this.modalService.fecharModal(modal)
  }
}