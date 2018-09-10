import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class RequestHelper {

    constructor(private _httpClient: HttpClient) { }

    getAll(entityUrl: string, queryParams: any) {
        const options = {
            params : {
                query: JSON.stringify(queryParams.queryParams),
                pageIndex: queryParams.pageIndex,
                pageSize: queryParams.pageSize
            }
        };
        return this._httpClient.get<any>(entityUrl, options);
    }

    getDetailById(entityUrl: string, targetId: string) {
        return this._httpClient.get(`${entityUrl}/${targetId}`);
    }

    get(api: string, options?: any): Observable<any> {
        return this._httpClient.get(api, options);
    }

    post(api: string, data: any, options?: any): Observable<any> {
        if (!options) { options = {}; }
        return this._httpClient.post(api, data, options);
    }

    put(api: string, data: any, options): Observable<any> {
        if (!options) { options = {}; }
        return this._httpClient.put(api, data, options);
    }

    bulk(api: string, data: any[]): Observable<any> {
        return this._httpClient.post(api, data);
    }

    delete(api: string): Observable<any> {
        return this._httpClient.delete(api);
    }
}
