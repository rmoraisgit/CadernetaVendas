    import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';

import { User } from './user';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    userSubject = new BehaviorSubject<User>(null);

    constructor(private tokenService: TokenService) { 

        // this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setUserToken(tokenValue: string) {
        this.tokenService.setToken(tokenValue);
    }

    setUserApp(userValue: string){
        window.localStorage.setItem('userApp', userValue);
    }
}