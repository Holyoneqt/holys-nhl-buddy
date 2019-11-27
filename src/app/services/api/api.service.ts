import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() {
    }

    protected get<T>(url: string): Promise<T> {
        console.log('GET', url);
        return fetch(url, {mode: 'cors'})
            .then(response => response.json());
    }

}
