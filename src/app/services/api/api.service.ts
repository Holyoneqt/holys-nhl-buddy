import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() {
    }

    protected get<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => response.json());
    }

}
