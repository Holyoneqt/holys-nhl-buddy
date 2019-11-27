import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { NhlApiRecord, NhlApiTeamRecord } from 'src/app/models/api/nhl.api.model';
import { NhlApiService } from 'src/app/services/api/nhl.api.service';

interface StandingsGroup {
    name: string;
    teams: StandingsGroupTeam[];
}

interface StandingsGroupTeam {
    id: string;
    name: string;
    record: string;
    gamesPlayed: number;
    streak: string;
    plusMinus: number;
    points: number;
}

@Component({
    selector: 'app-standings',
    templateUrl: 'standings.component.html',
    styleUrls: ['standings.component.css']
})
export class StandingsComponent implements OnInit {

    public loading = true;

    public standingsDisplayType: 'divisions' | 'conferences' | 'league' = 'divisions';

    private standingsData: NhlApiRecord[];
    public standingsDisplayData: StandingsGroup[] = [];

    constructor(private nhlApi: NhlApiService) { }

    public async ngOnInit(): Promise<void> {
        this.standingsData = (await this.nhlApi.getStandings()).records;
        console.log(this.standingsData);
        this.displayStandings();
    }

    public onStandingsDisplayChange(e: MatButtonToggleChange): void {
        this.standingsDisplayType = e.value;
        this.displayStandings();
    }

    private displayStandings(): void {
        this.standingsDisplayData = [];
        switch (this.standingsDisplayType) {
            case 'divisions':
                this.standingsData.forEach(data => {
                    this.standingsDisplayData.push({
                        name: data.division.name,
                        teams: data.teamRecords.map(team => this.mapTeam(team)),
                    });
                });
                break;
            case 'conferences':
                const easternTeams = [...this.standingsData[0].teamRecords, ...this.standingsData[1].teamRecords].sort((a, b) => parseFloat(a.conferenceRank) - parseFloat(b.conferenceRank));
                const westernTeams = [...this.standingsData[2].teamRecords, ...this.standingsData[3].teamRecords].sort((a, b) => parseFloat(a.conferenceRank) - parseFloat(b.conferenceRank));;

                this.standingsDisplayData.push({
                    name: 'Eastern',
                    teams: easternTeams.map(team => this.mapTeam(team)),
                });
                this.standingsDisplayData.push({
                    name: 'Western',
                    teams: westernTeams.map(team => this.mapTeam(team)),
                });

                break;
            case 'league':
                const allTeams = [
                    ...this.standingsData[0].teamRecords,
                    ...this.standingsData[1].teamRecords,
                    ...this.standingsData[2].teamRecords,
                    ...this.standingsData[3].teamRecords
                ].sort((a, b) => parseFloat(a.leagueRank) - parseFloat(b.leagueRank));
                
                this.standingsDisplayData.push({
                    name: 'NHL',
                    teams: allTeams.map(team => this.mapTeam(team)),
                });
                break;
            default: break;
        }

        this.loading = false;
        console.log(this.standingsDisplayData);
    }

    private mapTeam(team: NhlApiTeamRecord): StandingsGroupTeam {
        return {
            id: team.team.id.toString(),
            name: team.team.name,
            record: `${team.leagueRecord.wins}-${team.leagueRecord.losses}-${team.leagueRecord.ot}`,
            gamesPlayed: team.gamesPlayed,
            plusMinus: team.goalsScored - team.goalsAgainst,
            streak: team.streak.streakCode,
            points: team.points,
        };
    }

}
