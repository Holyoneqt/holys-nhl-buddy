export class ApiService {

    constructor() {
    }

    protected get<T>(url: string): Promise<T> {
        console.log('GET', url);
        return fetch(url)
            .then(response => response.json());
    }

}
