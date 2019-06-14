import { AbstractControl } from '@angular/forms';

export function selectValidator(control: AbstractControl) {

    if (control.value != 'Selecione...') return null;

    return { selectVazio: true };
}