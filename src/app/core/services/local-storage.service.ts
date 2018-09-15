import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    get(key: string) {
        const localValue = localStorage.getItem(key);
        return localValue ? JSON.parse(localValue) : '';
    }
    remove(key: string) {
        localStorage.removeItem(key);
    }
}
