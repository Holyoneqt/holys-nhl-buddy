import { Component, OnInit } from '@angular/core';
import { YoutubeApiItem } from 'src/app/models/api/youtube.api.model';

import { YoutubeApiService } from './../../services/api/youtube.api.service';

@Component({
    selector: 'app-highlights',
    templateUrl: 'highlights.component.html',
    styleUrls: ['highlights.component.css']
})
export class HighlightsComponent implements OnInit {

    public loading = true;

    public allVideos: YoutubeApiItem[] = [];
    public todaysVideos: YoutubeApiItem[] = [];
    public olderVideos: YoutubeApiItem[] = [];

    constructor(private ytApi: YoutubeApiService) { }

    public async ngOnInit(): Promise<void> {
        this.allVideos = (await this.ytApi.getAllVideos()).items.filter(item => item.snippet.thumbnails !== undefined);
        this.todaysVideos = this.allVideos.filter(video => video.snippet.publishedAt.startsWith(new Date().toISOString().substring(0, 10)));
        this.olderVideos =  this.allVideos.filter(video => !video.snippet.publishedAt.startsWith(new Date().toISOString().substring(0, 10)));
    }

    public watchVideo(videoId: string): void {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }

}
