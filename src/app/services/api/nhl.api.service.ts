import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class NhlApiService extends ApiService {
  
    private readonly API_URL = 'https://statsapi.web.nhl.com/api/v1';

    private readonly STANDINGS = `${this.API_URL}/standings`;
    private readonly TEAMS = `${this.API_URL}/teams`;
    private readonly SCHEDULE = `${this.API_URL}/schedule`;
    private readonly GAME = `${this.API_URL}/game`;
    private readonly PEOPLE = `${this.API_URL}/people`;

    constructor() {
        super();
    }

    public getGame(id: string): Promise<NhlApi.Game.ApiResponse> {
        return super.get(`${this.GAME}/${id}/feed/live`);
    }

    public getScores(start: string, end: string): Promise<NhlApi.Schedule.Response> {
        return super.get(`${this.SCHEDULE}?startDate=${start}&endDate=${end}`);
    }

}
