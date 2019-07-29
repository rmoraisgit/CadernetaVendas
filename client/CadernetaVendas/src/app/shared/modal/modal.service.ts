import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class ModalService {

    modalAtiva: NgbModalRef;

    constructor(private ngbModalService: NgbModal) { }

    abrirModal(nomeModal) {

        this.modalAtiva = this.ngbModalService.open(nomeModal);
        return this.modalAtiva;
    }

    fecharModal(nomeModal) {

        console.log(nomeModal);
        console.log(this.modalAtiva );

        if (this.modalAtiva != undefined) {
            this.modalAtiva.close();
            this.modalAtiva = null;
            return;
        }

        this.ngbModalService.dismissAll(nomeModal);
    }

    fecharModalRef(modal: NgbModalRef) {

        this.ngbModalService.dismissAll(modal);
    }
}