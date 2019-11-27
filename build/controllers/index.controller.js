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
const nhl_api_1 = require("../nhl.api");
const global_util_1 = require("../util/global.util");
const game_helper_1 = require("../util/helper/game.helper");
const nhl_util_1 = require("../util/nhl.util");
let todaysGames;
window.onload = () => {
    global_util_1.registerSidenav();
    const dateToday = nhl_util_1.getNhlApiDate(new Date());
    nhl_api_1.getScores(dateToday, dateToday)
        .then(response => todaysGames = new game_helper_1.GameArrayHelper(response.dates))
        .then(() => displayTodaysGames());
};
function displayTodaysGames() {
    const todaysGamesTable = document.getElementById('todays-games');
    todaysGames.all().select().forEach((g) => __awaiter(this, void 0, void 0, function* () {
        const gameData = (yield nhl_api_1.getGame(g.gamePk.toString())).gameData;
        const gameContainer = document.createElement('div');
        gameContainer.innerHTML = todaysGameTemplate({
            time: new Date(gameData.datetime.dateTime).toLocaleTimeString().substring(0, 5),
            away: {
                name: g.teams.away.team.name,
                record: leagueRecord(g.teams.away),
            },
            home: {
                name: g.teams.home.team.name,
                record: leagueRecord(g.teams.home),
            }
        });
        gameContainer.children[0].onclick = () => window.location.href = `./game.html?id=${g.gamePk}`;
        todaysGamesTable.appendChild(gameContainer);
    }));
}
function leagueRecord(team) {
    return `${team.leagueRecord.wins}-${team.leagueRecord.losses}-${team.leagueRecord.ot}`;
}
function todaysGameTemplate(model) {
    return `
        <div class="game">
            <div class="game--time">${model.time}</div>
                <div class="game--teams">
                    <div class="game--team-away">${model.away.name}</div>
                    <div class="game--team-home">${model.home.name}</div>
                </div>
                <div class="game--records">
                    <div class="game--record-away">${model.away.record}</div>
                    <div class="game--record-home">${model.home.record}</div>
                </div>
            </div>
        </div>
    `;
}
