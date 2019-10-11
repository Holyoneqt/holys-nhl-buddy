import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NhlApiService } from 'src/app/services/api/nhl.api.service';
import { YoutubeApiService } from 'src/app/services/api/youtube.api.service';
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

    constructor(private router: Router, private nhlApi: NhlApiService, private youtubeApi: YoutubeApiService) { }

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

    public async watchHighlight(game: any): Promise<void> {
        const teams = (await this.nhlApi.getTeams(game.teams.away.team.id.toString(), game.teams.home.team.id.toString())).teams;
        const highlights = await this.youtubeApi.getAllVideos();
        
        const highlightVideo = highlights.items.find(video => 
            video.snippet.title.includes(teams[0].teamName) &&
            video.snippet.title.includes(teams[1].teamName)
        );
        
        window.open(`https://www.youtube.com/watch?v=${highlightVideo.snippet.resourceId.videoId}`, '_blank');
    }

    public routeToGameDetails(game: any): void {
        if (game.status.codedGameState !== '7') {
            return;
        } else {
            this.router.navigate(['/game', game.gamePk]);
        }
    }

}
