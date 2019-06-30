import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {
    protected UrlServiceV1: string = 'https://localhost:5002/api/';
    protected UrlServiceViaCep: string = 'https://viacep.com.br/ws/';

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    protected ObterHeaderFormData() {
        return {
            headers: new HttpHeaders({
                'Content-Disposition': 'form-data; name="produto"'
            })
        };
    }

    protected obterTokenUsuario(): string {
        console.log(localStorage.getItem('userToken'));
        return window.localStorage.getItem('userToken');
    }

    protected extractData(response: any) {
        return response.data || {};
    }
}