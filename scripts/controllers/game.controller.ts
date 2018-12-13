import { getGame, getTeam, getSchedule, SEASON_START, SEASON_END, TEAM_NAME_SHORT, TEAM_COLORS } from '../nhl.api';
import { getLoadingIcon, removeLoadingIcon } from '../util/global.util';
import { teamHasWonGame } from '../util/nhl.util';
import { createTr } from '../util/global.util';
import { GameArrayHelper } from '../util/helper/game.helper';

let gameData: NhlApi.Game.GameData;
let awayTeam: NhlApi.Team.Team;
let homeTeam: NhlApi.Team.Team;

let awayGames: GameArrayHelper;
let homeGames: GameArrayHelper;

window.onload = () => {
    document.body.appendChild(getLoadingIcon(true));
    document.getElementById('display-stats').onclick = displayStats;
    document.getElementById('display-last-ten').onclick = displayLastTen;

    const parameter = window.location.href.split('?')[1];
    if (parameter) {
        if (parameter.startsWith('id')) {
            fetchData(parameter.substring(3))
                .then(() => displayMetaData())
                .then(() => removeLoadingIcon());
        }
    }
};

function fetchData(gameId: string): Promise<any> {
    return getGame(gameId)
        .then(response => gameData = response.gameData)
        .then(() => getTeam(gameData.teams.away.id))
        .then(response => awayTeam = response.teams[0])
        .then(() => getTeam(gameData.teams.home.id))
        .then(response => homeTeam = response.teams[0])
        .then(() => getSchedule(gameData.teams.away.id, SEASON_START, SEASON_END))
        .then(response => awayGames = new GameArrayHelper(response.dates))
        .then(() => getSchedule(gameData.teams.home.id, SEASON_START, SEASON_END))
        .then(response => homeGames = new GameArrayHelper(response.dates));
}

function displayMetaData(): void {
    document.getElementById('details').style.display = 'block';

    (<HTMLImageElement> document.getElementById('away-logo')).src = `./images/${awayTeam.id}.gif`;
    (<HTMLImageElement> document.getElementById('home-logo')).src = `./images/${homeTeam.id}.gif`;

    displayStats();
}

function displayStats() {
    const detailsTable = document.getElementById('details-table');

    const awayTeamStats = awayTeam.teamStats[0].splits[0].stat, homeTeamStats = homeTeam.teamStats[0].splits[0].stat;

    detailsTable.innerHTML = '';
    detailsTable.appendChild(createTr([awayTeam.abbreviation, '@', homeTeam.abbreviation], { type: 'th' }));
    detailsTable.appendChild(createTr(['Regular Season'], { highlight: false, type: 'th', colspan: 3 }));
    detailsTable.appendChild(createTr([awayTeamStats.gamesPlayed, 'Games Played', homeTeamStats.gamesPlayed]));
    detailsTable.appendChild(createTr([awayTeamStats.wins, 'Wins', homeTeamStats.wins], { highlight: true }));
    detailsTable.appendChild(createTr([awayTeamStats.losses, 'Losses', homeTeamStats.losses], { highlight: true, invertHighlight: true }));
    detailsTable.appendChild(createTr([awayTeamStats.ot, 'OT', homeTeamStats.ot]));
    detailsTable.appendChild(createTr([awayTeamStats.ptPctg, 'Point %', homeTeamStats.ptPctg], { highlight: true }));
    detailsTable.appendChild(createTr([' ', ' ', ' ']));
    detailsTable.appendChild(createTr([awayTeamStats.goalsPerGame, 'Goals per Game', homeTeamStats.goalsPerGame], { highlight: true }));
    detailsTable.appendChild(createTr([awayTeamStats.powerPlayPercentage, 'PP%', homeTeamStats.powerPlayPercentage], { highlight: true }));
    detailsTable.appendChild(createTr([awayTeamStats.penaltyKillPercentage, 'PK%', homeTeamStats.penaltyKillPercentage], { highlight: true }));
    detailsTable.appendChild(createTr([' ', ' ', ' ']));
    detailsTable.appendChild(createTr([Math.round(awayTeamStats.shotsPerGame), 'Shots per Game', Math.round(homeTeamStats.shotsPerGame)], { highlight: true }));
    detailsTable.appendChild(createTr([awayTeamStats.shootingPctg, 'Shooting %', homeTeamStats.shootingPctg], { highlight: true }));
    detailsTable.appendChild(createTr([Math.round(awayTeamStats.shotsAllowed), 'Shots Against', Math.round(homeTeamStats.shotsAllowed)], { highlight: true, invertHighlight: true }));
    detailsTable.appendChild(createTr([awayTeamStats.savePctg, 'Save %', homeTeamStats.savePctg], { highlight: true }));
    detailsTable.appendChild(createTr([' ', ' ', ' ']));
}

function displayLastTen() {
    const detailsTable = document.getElementById('details-table');

    const lastTwoWeeksAway = awayGames.final().ofPastDays(14).select();
    const lastTwoWeeksHome = homeGames.final().ofPastDays(14).select();
    const lastFiveAway = awayGames.final().last(5).select();
    const lastFiveHome = homeGames.final().last(5).select();

    detailsTable.innerHTML = '';
    detailsTable.appendChild(createTr([awayTeam.abbreviation, '@', homeTeam.abbreviation], { type: 'th' }));
    detailsTable.appendChild(createTr(['Past 2 Weeks'],  { type: 'th', colspan: 3 }));
    detailsTable.appendChild(createTr([getRecord(lastTwoWeeksAway, awayTeam.id), 'Record', getRecord(lastTwoWeeksHome, homeTeam.id)]));

    const lastFiveTr = createTr(['', 'Last 5 Record', '']);
    lastFiveTr.classList.add('last-five')
    lastFiveTr.children[0].appendChild(getLastFiveGamesStreak(lastFiveAway, awayTeam.id));
    lastFiveTr.children[2].appendChild(getLastFiveGamesStreak(lastFiveHome, homeTeam.id));
    detailsTable.appendChild(lastFiveTr);

    // detailsTable.appendChild(createPointsCanvasTr(lastTenDaysAway, lastTenDaysHome));
    detailsTable.appendChild(createGoalsScoredCanvasTr(awayGames.final().ofPastDays(7).select(), homeGames.final().ofPastDays(7).select()));
}

function getRecord(iterable: NhlApi.Schedule.Game[], teamId: number): string {
    let w = 0, l = 0;
    iterable.forEach(g => teamHasWonGame(teamId, g) ? w += 1 : l += 1);
    return `${w}-${l}`;
}

function getLastFiveGamesStreak(iterable: NhlApi.Schedule.Game[], teamId: number): HTMLDivElement {
    const container = document.createElement('div');
    iterable.forEach(g => {
        const box = document.createElement('div');
        box.classList.add('box');
        if (teamHasWonGame(teamId, g)) {
            box.classList.add('box-win');
            box.innerHTML = 'W';
        } else {
            box.classList.add('box-loss');
            box.innerHTML = 'L';
        }
        container.appendChild(box);
    });
    return container;
}

function getTeamFromGame(game: NhlApi.Schedule.Game, teamId: number): NhlApi.Schedule.Away | NhlApi.Schedule.Home {
    if (game.teams.away.team.id === teamId) { return game.teams.away; }
    else { return game.teams.home; }
}

function createPointsCanvasTr(awayGames: NhlApi.Schedule.Game[], homeGames: NhlApi.Schedule.Game[]) {
    const tr = createTr([''], { highlight: false, colspan: 3 });

    var canvas = document.createElement('canvas');
    canvas.style.height = '150px';
    canvas.style.width = '100%';
    tr.children[0].appendChild(canvas);
    var chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: new Array(10),
            datasets: [{
                label: awayTeam.teamName,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: TEAM_COLORS[awayTeam.name].away,
                data: awayGames.map(g => getTeamFromGame(g, awayTeam.id).leagueRecord.wins),
                lineTension: 0,
            }, {
                label: homeTeam.teamName,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: TEAM_COLORS[homeTeam.name].home,
                data: homeGames.map(g => getTeamFromGame(g, homeTeam.id).leagueRecord.wins),
                lineTension: 0,
            }]
        },
        options: {
            title: { text: 'Wins total (Last 10 Games)', display: true }
        }
    });
    return tr;
}

function createGoalsScoredCanvasTr(awayGames: NhlApi.Schedule.Game[], homeGames: NhlApi.Schedule.Game[]) {
    const tr = createTr([''], { highlight: false, colspan: 3 });
    const firstDate = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7));
    const labels = [];
    while (firstDate.getTime() <= new Date().getTime()) {
        labels.push(new Date(firstDate));
        firstDate.setTime(firstDate.getTime() + (1000 * 60 * 60 * 24));
    }

    var canvas = document.createElement('canvas');
    if (window.screen.width < 1000) {
        canvas.width = 1;
    } else {
        canvas.width = 3;
    }
    canvas.height = 1;
    canvas.style.width = '100%';
    tr.children[0].appendChild(canvas);
    console.log(labels);
    var chart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels.map(d => d.toLocaleDateString('ch-de').slice(0, -5)),
            datasets: [{
                label: awayTeam.teamName,
                backgroundColor: TEAM_COLORS[awayTeam.name].away,
                data: getGameData(awayTeam.id, awayGames, labels),
                barLabel: getBarLabels(awayTeam.id, awayGames, labels)
            }, {
                label: homeTeam.teamName,
                backgroundColor: TEAM_COLORS[homeTeam.name].home,
                data: getGameData(homeTeam.id, homeGames, labels),
                barLabel: getBarLabels(homeTeam.id, homeGames, labels)
            }]
        },
        options: {
            title: { text: 'Goal diff. (Past 7 Days)', display: true },
            tooltips: {
                enabled: false,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {

                            stepSize: 1,
                            min: -6,
                            max: 6,
                        }
                    }
                ]
            },
            animation: {
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx: CanvasRenderingContext2D = chartInstance.ctx;

                    ctx.font = 'bold 10pt Consolas';
                    ctx.fillStyle = 'black';
                    ctx.textAlign = "center";

                    const stepHeight = 11;
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            var label = dataset.barLabel[index];
                            if (data === 0 || !label) { return; }
                            ctx.save();
                            ctx.translate(bar._model.x - 8, bar._model.y + data * stepHeight);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText(label, 0, 0);
                            ctx.restore();
                        });
                    });

                }
            }
        }
    });
    return tr;
}

function getGameData(teamId: number, games: NhlApi.Schedule.Game[], dateRange: Date[]): number[] {
    const gameData: any[] = [];
    const returnData: number[] = [];
    dateRange.forEach(date => {
        const gameDay = games.find(g => `${new Date(g.gameDate).getDate()}-${new Date(g.gameDate).getMonth()}` === `${date.getDate()}-${date.getMonth()}`)
        gameDay ? gameData.push(gameDay) : gameData.push(undefined);
    });

    gameData.forEach(g => g ? returnData.push(getGoalDiff(g, teamId)) : returnData.push(0));

    return returnData;
}

function getBarLabels(teamId: number, games: NhlApi.Schedule.Game[], dateRange: Date[]) {
    const gameData: any[] = [];
    const returnData: string[] = [];
    dateRange.forEach(date => {
        const gameDay = games.find(g => `${new Date(g.gameDate).getDate()}-${new Date(g.gameDate).getMonth()}` === `${date.getDate()}-${date.getMonth()}`)
        gameDay ? gameData.push(gameDay) : gameData.push(undefined);
    });

    gameData.forEach((g: NhlApi.Schedule.Game) => {
        if (g) {
            if (g.teams.away.team.id === teamId) { returnData.push(`@ ${TEAM_NAME_SHORT[g.teams.home.team.name]}`) }
            else { returnData.push(`vs. ${TEAM_NAME_SHORT[g.teams.away.team.name]}`) }
        } else {
            returnData.push(undefined);
        }
    });

    return returnData;
}

function getGoalDiff(game: NhlApi.Schedule.Game, teamId: number) {
    if (game.teams.away.team.id === teamId) {
        return game.teams.away.score - game.teams.home.score;
    } else {
        return game.teams.home.score - game.teams.away.score;
    }
}
