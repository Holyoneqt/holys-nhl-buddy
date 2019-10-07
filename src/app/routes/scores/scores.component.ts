import { Component, OnInit } from '@angular/core';
import { NhlApiService } from 'src/app/services/api/nhl.api.service';
import { getNhlApiDate } from 'src/app/util/nhl.api.util';

@Component({
    selector: 'app-scores',
    templateUrl: 'scores.component.html',
    styleUrls: ['scores.component.css']
})
export class ScoresComponent implements OnInit {

    public selectedDate: Date;
    public gamesOfDate: any = [];

    public loading = true;

    constructor(private nhlApi: NhlApiService) { }

    public async ngOnInit(): Promise<void> {
        this.selectedDate = new Date();
        this.changeDate(0);
    }

    public async changeDate(change: number): Promise<void> {
        this.loading = true;
        this.selectedDate.setTime(this.selectedDate.getTime() + (1000 * 60 * 60 * 24 * change));
        this.gamesOfDate = (await this.nhlApi.getScores(getNhlApiDate(this.selectedDate), getNhlApiDate(this.selectedDate))).dates[0].games;
        this.loading = false;
    }

}
