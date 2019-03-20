import { registerSidenav } from '../util/global.util';
import { getAllVideos } from '../youtube.api';

const date = new Date();
date.setTime(new Date().getTime() - (1000 * 60 * 60 * 24));
let condensedGames: YoutubeApi.Item[] = [];

window.onload = async () => {
    registerSidenav();
    displayDate(date.toLocaleDateString());

    document.getElementById('prev').onclick = () => {
        date.setTime(date.getTime() - (1000 * 60 * 60 * 24));
        displayDate(date.toLocaleDateString());
        let gamesOfDay = condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date)));
        displayGames(gamesOfDay);
    };

    document.getElementById('next').onclick = () => {
        date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
        displayDate(date.toLocaleDateString());
        let gamesOfDay = condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date)));
        displayGames(gamesOfDay);
    };

    condensedGames = (await getAllVideos()).items.filter(i => i.snippet.title.includes('Condensed Game'));
    console.log(condensedGames);
    displayGames(condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date))));
        // .then(json => json.)
        // .then(filtered => condensedGames = filtered)
        // .then(() => );
};

function displayGames(gameList: YoutubeApi.Item[]): void {
    var gamesList = document.getElementById('games');
    gamesList.innerHTML = '';
    gameList.forEach(game => {
        const listItemTemplate = document.createElement('template');

        listItemTemplate.innerHTML = `
            <li>
                <div class="youtube-link--container">
                    <img src="${game.snippet.thumbnails.default.url}" style="position: absolute;" />
                    <span class="youtube-link--info">
                        <div class="youtube-link--title">${game.snippet.title.substring('mm/dd/yy Condensed Game: '.length)}</div>
                        <div class="youtube-link--date">${new Date(game.snippet.title.substring(0, 8)).toLocaleDateString()}</div>
                        <div class="youtube-link--description">${game.snippet.description}</div>
                    </span>
                </div>
            </li>
        `;

        (listItemTemplate.content.querySelector('.youtube-link--container') as HTMLLIElement).onclick = () => {
            location.href = `https://www.youtube.com/watch?v=${game.id.videoId}`;
        };

        gamesList.appendChild(listItemTemplate.content);
    });
}

function displayDate(date: string): void {
    document.getElementById('date').innerHTML = date;
}

function getFormatedDate(date: Date): string {
    var month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = '0' + month;
    }
    var day = date.getDate().toString();
    if (day.length === 1) {
        day = '0' + day;
    }
    var year = date.getUTCFullYear() - 2000;

    return `${month}/${day}/${year}`;
}