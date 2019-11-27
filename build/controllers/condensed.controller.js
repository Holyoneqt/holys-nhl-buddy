"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_util_1 = require("../util/global.util");
const youtube_api_1 = require("../youtube.api");
const date = new Date();
date.setTime(new Date().getTime() - (1000 * 60 * 60 * 24));
let condensedGames = [];
window.onload = () => __awaiter(this, void 0, void 0, function* () {
    global_util_1.registerSidenav();
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
    condensedGames = (yield youtube_api_1.getAllVideos()).items;
    displayGames(condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date))));
});
function displayGames(gameList) {
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
        listItemTemplate.content.querySelector('.youtube-link--container').onclick = () => {
            location.href = `https://www.youtube.com/watch?v=${game.snippet.resourceId.videoId}`;
        };
        gamesList.appendChild(listItemTemplate.content);
    });
}
function displayDate(date) {
    document.getElementById('date').innerHTML = date;
}
function getFormatedDate(date) {
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
