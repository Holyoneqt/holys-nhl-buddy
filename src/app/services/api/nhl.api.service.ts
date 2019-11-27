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

    public async getPlayerStats(): Promise<NhlApiPlayerStat> {
        const currentSeasonId = (await this.getCurrentSeasonInfo()).seasonId;
        return (await super.get<any>(`https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=basic&isGame=false&reportName=skatersummary&sort=[{%22property%22:%22points%22,%22direction%22:%22DESC%22},{%22property%22:%22goals%22,%22direction%22:%22DESC%22},{%22property%22:%22assists%22,%22direction%22:%22DESC%22}]&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=20192020%20and%20seasonId%3C=20192020`)).data;
    }

}
