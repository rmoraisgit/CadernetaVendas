import { Injectable } from '@angular/core';
import { localStorageService } from '../localStorage/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from "jwt-decode";

import { User } from '../user/user';

const KEY = 'userAccessToken';

@Injectable({
    providedIn: 'root'
})
export class UserTokenService {

    private userSubject = new BehaviorSubject<User>(null);

    constructor(private localStorageService: localStorageService) {
        this.hasAccessToken() &&
            this.NotifyUser();
    }

    hasAccessToken() {
        return !!this.getItem();
    }

    getItem() {
        return this.localStorageService.getItem(KEY);
    }

    setUserAccessToken(userAccessTokenValue: any) {
        this.localStorageService.setItem(KEY, JSON.stringify(userAccessTokenValue));
        this.NotifyUser();
    }

    removeUserAccessToken() {
        this.localStorageService.removeItem(KEY);
    }

    getAccessToken() {
        return this.extractToken(this.getItem());
    }

    getUserToken() {
        return this.extractUser(this.getItem());
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    isTokenValid(): boolean {
        const userToken = jwt_decode(this.getAccessToken());
        const expiryDate = new Date(userToken.exp * 1000);

        console.log(new Date());
        console.log(expiryDate);

        if (new Date() > expiryDate)
            return false;

        return true;
    }

    private NotifyUser() {
        this.userSubject.next(this.getUserToken());
    }

    private extractToken(accessTokenValue: any) {
        return JSON.parse(accessTokenValue).accessToken || {};
    }

    private extractUser(accessTokenValue: any) {
        return JSON.parse(accessTokenValue).userToken || {};
    }
}