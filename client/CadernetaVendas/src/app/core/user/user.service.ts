import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { localStorageService } from '../localStorage/local-storage.service';

import { User } from './user';

const KEY = 'userToken';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userSubject = new BehaviorSubject<User>(null);

    constructor(private localStorageService: localStorageService) {

        // this.tokenService.hasToken() && this.decodeAndNotify();
    }

    hasUserToken() {
        return !!this.getUserToken();
    }

    getUserToken() {
        return this.localStorageService.getItem(KEY);
    }

    setUserToken(UserTokenValue: string) {
        this.localStorageService.setItem(KEY, UserTokenValue);
    }

    removeUserToken() {
        this.localStorageService.removeItem(KEY);
    }
}