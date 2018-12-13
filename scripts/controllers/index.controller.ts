import { getScores, getGame } from '../nhl.api';
import { registerSidenav, createTr } from '../util/global.util';
import { GameArrayHelper } from '../util/helper/game.helper';
import { getNhlApiDate } from '../util/nhl.util';
import { TodaysGameModel } from '../models';

let todaysGames: GameArrayHelper;

window.onload = () => {
    registerSidenav();

    const dateToday = getNhlApiDate(new Date());
    getScores(dateToday, dateToday)
        .then(response => todaysGames = new GameArrayHelper(response.dates))
        .then(() => displayTodaysGames());
};

function displayTodaysGames() {
    const todaysGamesTable = document.getElementById('todays-games');
    todaysGames.all().select().forEach(async g => {
        const gameData = (await getGame(g.gamePk.toString())).gameData;

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
        (<HTMLDivElement> gameContainer.children[0]).onclick = () => window.location.href = `./game.html?id=${g.gamePk}`;
        todaysGamesTable.appendChild(gameContainer);
    });
}

function leagueRecord(team: NhlApi.Schedule.Home | NhlApi.Schedule.Away): string {
    return `${team.leagueRecord.wins}-${team.leagueRecord.losses}-${team.leagueRecord.ot}`;
}

function todaysGameTemplate(model: TodaysGameModel) {
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