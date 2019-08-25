import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

// import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
        private userService: UserService) { super(); }

    authenticate(email: string, password: string) {
        return this.http
            .post(this.UrlServiceV1 + 'entrar', { email, password }, this.ObterHeaderJson())
            .pipe(
                map(super.extractData)
            );
    }

    persistirTokenUserApp(data: any) {
        this.tokenService.setAccessToken(data.accessToken);
        this.userService.setUserToken(JSON.stringify(data.userToken));
    }
}