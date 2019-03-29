import { AbstractControl } from '@angular/forms';

export function moedaValidator(control: AbstractControl) {

    if (control.value == null) return null;

    let preco: string = control.value;
    let precoCorreto: string = preco.toString();

    let conteudoPreco: string[] = precoCorreto.split('.');
    let precoFormatoCorreto: string = conteudoPreco[0].replace('.', '');
    let precoCentavos: string = conteudoPreco[1];

    console.log(precoCorreto);
    console.log(control.value);
    console.log(precoFormatoCorreto);
    console.log(precoCentavos);


    if (+precoFormatoCorreto >= 50000 && (+precoCentavos > 0 || +precoCentavos == undefined)) {
        console.log("CAI NO IF");

        return { maxValorMoeda: true }
    }

    return null;
}