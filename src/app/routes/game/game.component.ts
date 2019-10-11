import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NhlApiService } from 'src/app/services/api/nhl.api.service';

interface Scoring {
    teamId: string;
    overallScore: string;
    time: string;
    scorer: string;
    assists: string[];
};

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {

    public loading: BehaviorSubject<boolean>;

    public response: any;
    public gameStats: {
        away: string | number;
        name: string;
        home: string | number;
    }[] = [];
    public scorings: Scoring[];

    constructor(public location: Location, private route: ActivatedRoute, private nhlApi: NhlApiService) { }

    public async ngOnInit(): Promise<void> {
        this.loading = new BehaviorSubject(true);
        this.route.params.subscribe(async params => {
            this.response = await this.nhlApi.getGame(params.id);
            console.log(this.response);
            
            const away = this.response.liveData.boxscore.teams.away.teamStats.teamSkaterStats;
            const home = this.response.liveData.boxscore.teams.home.teamStats.teamSkaterStats;
            this.gameStats.push({ away: away.goals, name: 'Goals', home: home.goals });
            this.gameStats.push({ away: away.shots, name: 'Shots', home: home.shots });
            this.gameStats.push({ away: `${Math.round((away.goals / away.shots) * 100)}%`, name: 'Shots %', home: `${Math.round((home.goals / home.shots) * 100)}%` });
            this.gameStats.push({ away: away.hits, name: 'Hits', home: home.hits });
            this.gameStats.push({ away: away.powerPlayGoals, name: 'PPG', home: home.powerPlayGoals });
            this.gameStats.push({ away: away.powerPlayPercentage, name: 'PP%', home: home.powerPlayPercentage });
            this.gameStats.push({ away: away.faceOffWinPercentage, name: 'FO%', home: home.faceOffWinPercentage });
            this.gameStats.push({ away: away.blocked, name: 'Blocked', home: home.blocked });
            this.gameStats.push({ away: away.giveaways, name: 'Giveaways', home: home.giveaways });
            this.gameStats.push({ away: away.takeaways, name: 'Takeaways', home: home.takeaways });
            
            this.scorings = this.mapScoring();

            this.loading.next(false);
        });
    }

    private mapScoring(): Scoring[] {
        const scoringPlays = this.response.liveData.plays.allPlays.filter(play => play.result.eventTypeId === 'GOAL');
        
        const scorings: Scoring[] = scoringPlays.map(play => {
            const scorer = play.players.find(player => player.playerType === 'Scorer');
            const assists = play.players.filter(player => player.playerType === 'Assist').map(a => `${a.player.fullName} (${a.seasonTotal})`);
            return {
                teamId: play.team.id,
                overallScore: `${play.about.goals.away} : ${play.about.goals.home}`,
                time: `${play.about.periodTime} ${play.about.ordinalNum}`,
                scorer: `${scorer.player.fullName} (${scorer.seasonTotal})`,
                assists: assists.length === 0 ? ['Unassisted'] : assists,
            } as Scoring;
        });

        return scorings;
    }

}
