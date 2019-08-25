import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class localStorageService {

    anyItem(key: string) {
        return !!this.getItem(key);
    }

    getItem(key: string) {
        return window.localStorage.getItem(key);
    }

    setItem(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    removeItem(key) {
        window.localStorage.removeItem(key);
    }
}