import { Component, OnInit } from '@angular/core';
import { NhlApiService } from 'src/app/services/api/nhl.api.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

    constructor(private nhlApi: NhlApiService) { }

    public async ngOnInit(): Promise<void> {
        console.log(await this.nhlApi.getPlayerStats());
    }

}
