import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { NhlApiPlayerStat } from 'src/app/models/api/nhl.api.model';
import { NHL_TEAM_TO_ID_MAPPING } from 'src/app/models/nhl.constants';
import { NhlApiService } from 'src/app/services/api/nhl.api.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

    public readonly TEAM_ID = NHL_TEAM_TO_ID_MAPPING;

    public dataSource: Observable<NhlApiPlayerStat[]>;
    public displayedColumns: string[] = ['skaterFullName', 'gamesPlayed', 'goals', 'assists', 'points', 'pointsPerGame', 'plusMinus', 'penaltyMinutes', 'faceoffWinPct', 'timeOnIcePerGame'];

    constructor(private nhlApi: NhlApiService) { }

    public async ngOnInit(): Promise<void> {
        this.dataSource = from(this.nhlApi.getPlayerStats());
        this.dataSource.subscribe(d => console.log(d));
    }

    public toMinuteSecondsFormat(seconds: number): string {
        const minutes: number = Math.floor(seconds / 60);
        return minutes.toString().padStart(2, '0') + ':' +
            (Math.floor(seconds - minutes * 60)).toString().padStart(2, '0');
    }

}
