import { Injectable } from '@angular/core';
import { YoutubeApiResponse } from 'src/app/models/api/youtube.api.model';

import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class YoutubeApiService extends ApiService {

    private readonly apiKey = 'AIzaSyBkuDsvSfgkLRziqy0lAYOkbOSHKzhiDF0';
    private readonly url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PL1NbHSfosBuHInmjsLcBuqeSV256FqlOO&key=${this.apiKey}`;

    constructor() {
        super();
    }

    public getAllVideos(): Promise<YoutubeApiResponse> {
        return super.get(this.url);
    }

}
