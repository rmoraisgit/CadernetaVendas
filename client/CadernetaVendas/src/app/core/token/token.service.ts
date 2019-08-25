import { Injectable } from '@angular/core';
import { localStorageService } from '../localStorage/local-storage.service';

const KEY = 'accessToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private localStorageService: localStorageService) { }

    hasAccessToken() {
        return !!this.getAccessToken();
    }

    getAccessToken() {
        return this.localStorageService.getItem(KEY);
    }

    setAccessToken(accessTokenValue: string) {
        this.localStorageService.setItem(KEY, accessTokenValue);
    }

    removeAccessToken() {
        this.localStorageService.removeItem(KEY);
    }
}