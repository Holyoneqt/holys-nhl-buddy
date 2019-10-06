import { Component, OnInit } from '@angular/core';
import { NhlApiService } from 'src/app/services/api/nhl.api.service';
import { getNhlApiDate } from 'src/app/util/nhl.api.util';


@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    public loading = true;
    public gamesOfToday = [];

    constructor(private nhlApi: NhlApiService) { }

    public async ngOnInit(): Promise<void> {
        const dateToday = getNhlApiDate(new Date());
        (await this.nhlApi.getScores(dateToday, dateToday)).dates[0].games.forEach(async game => {
            const gameData = (await this.nhlApi.getGame(game.gamePk.toString())).gameData; 
            this.gamesOfToday.push({
                time: new Date(gameData.datetime.dateTime).toLocaleTimeString().substring(0, 5),
                away: {
                    name: game.teams.away.team.name,
                    record: `${game.teams.away.leagueRecord.wins}-${game.teams.away.leagueRecord.losses}-${game.teams.away.leagueRecord.ot}`,
                },
                home: {
                    name: game.teams.home.team.name,
                    record: `${game.teams.home.leagueRecord.wins}-${game.teams.home.leagueRecord.losses}-${game.teams.home.leagueRecord.ot}`,
                }
            });
        });

        this.loading = false;
    }

}
