import { AbstractControl } from '@angular/forms';

export function pesoValidator(control: AbstractControl) {

    console.log(control.value);

    // if (control.value == null) return null;

    // let preco: string = control.value;
    // let precoCorreto: string = preco.toString();

    // let conteudoPreco: string[] = precoCorreto.split('.');
    // let precoFormatoCorreto: string = conteudoPreco[0].replace('.', '');
    // let precoCentavos: string = conteudoPreco[1];


    // if (+precoFormatoCorreto >= 50000 && (+precoCentavos > 0 || precoCentavos != undefined)) {
    //     console.log("CAI NO IF");

    //     return { maxValorMoeda: true }
    // }

    // return { teste: true }

    // return null;
}