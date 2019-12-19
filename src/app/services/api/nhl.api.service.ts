import { Injectable } from '@angular/core';
import {
    NhlApiPlayerStat,
    NhlApiRecordResponse,
    NhlApiScheduleResponse,
    NhlApiSeason,
    NhlApiTeamResponse,
} from 'src/app/models/api/nhl.api.model';

import { ApiService } from './api.service';

export interface GetTeamOptions {
    teams?: string[];
    expand?: string;
}

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

    public currentSeason: NhlApiSeason;

    constructor() {
        super();
    }

    public call(url: string): Promise<any> {
        return super.get(`https://statsapi.web.nhl.com${url}`);
    }

    public getCurrentSeasonInfo(): Promise<NhlApiSeason> {
        return this.call('/api/v1/seasons/current')
            .then(seasonRepsonse => seasonRepsonse.seasons[0]);
    }

    public getTeams(options: GetTeamOptions): Promise<NhlApiTeamResponse> {
        const parameters = [];
        if (options.teams !== undefined) {
            parameters.push(`teamId=${options.teams.join(',')}`);
        }
        if (options.expand !== undefined) {
            parameters.push(`expand=${options.expand}`);
        }

        return super.get(`${this.TEAMS}?${parameters.join('&')}`);
    }

    public getStandings(): Promise<NhlApiRecordResponse> {
        return super.get(this.STANDINGS);
    }

    public getGame(id: string): Promise<any> {
        return super.get(`${this.GAME}/${id}/feed/live`);
    }

    public getScores(start: string, end: string): Promise<NhlApiScheduleResponse> {
        return super.get(`${this.SCHEDULE}?startDate=${start}&endDate=${end}`);
    }

    public async getPlayerStats(): Promise<NhlApiPlayerStat[]> {
        const currentSeasonId = (await this.getCurrentSeasonInfo()).seasonId;
        return (await super.get<any>(
            `https://cors-anywhere.herokuapp.com/` + 
            `https://api.nhle.com/stats/rest/en/skater/summary` +
            `?isAggregate=false` + 
            `&isGame=false` +
            `&start=0` +
            `&limit=50` +
            `&sort=[{"property":"points","direction":"DESC"},{"property":"goals","direction":"DESC"},{"property":"assists","direction":"DESC"}]` +
            `&factCayenneExp=gamesPlayed>=1&cayenneExp=gameTypeId=2 and seasonId<=${currentSeasonId} and seasonId>=${currentSeasonId}`
        )).data;
    }

}
