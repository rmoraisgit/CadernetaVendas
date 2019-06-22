import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

// import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    constructor(
        private http: HttpClient,
        private userService: UserService) { super(); }

    authenticate(email: string, password: string) {
        return this.http.post(this.UrlServiceV1 + 'entrar', { email, password });
    }

    persistirUserApp(response: any) {
        this.userService.setToken(response.data);
    }
}