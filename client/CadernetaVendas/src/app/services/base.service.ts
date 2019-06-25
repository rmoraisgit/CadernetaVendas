import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../core/token/token.service';

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
}