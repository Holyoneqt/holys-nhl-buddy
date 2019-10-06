import { Component } from '@angular/core';

import { YoutubeApiService } from './services/api/youtube.api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private youtubeApi: YoutubeApiService) {
    }

}
