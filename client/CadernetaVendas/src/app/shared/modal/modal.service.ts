import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class ModalService {

    constructor(private ngbModalService: NgbModal) { }

    abrirModal(nomeModal) {

        this.ngbModalService.open(nomeModal);
    }

    fecharModal(nomeModal) {
        
        this.ngbModalService.dismissAll(nomeModal);
    }
}