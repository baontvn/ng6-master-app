import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestHelper } from './request.util';

@Injectable({
    providedIn: 'root'
})
export class Utilities {
    req: RequestHelper;

    constructor(
        private _httpClient: HttpClient) {

        this.req = new RequestHelper(_httpClient);
    }

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    isEquivalentObjs(objA: any, ObjB: any): Boolean {
        const aProps = Object.getOwnPropertyNames(objA);
        const bProps = Object.getOwnPropertyNames(ObjB);
        if (aProps.length !== bProps.length) {
            return false;
        }
        for (let i = 0; i < aProps.length; i++) {
            const propName = aProps[i];
            if (objA[propName] !== ObjB[propName]) {
                return false;
            }
        }
        return true;
    }
}
