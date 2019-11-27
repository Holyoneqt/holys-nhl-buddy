"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nhl_api_1 = require("../nhl.api");
const global_util_1 = require("../util/global.util");
const game_helper_1 = require("../util/helper/game.helper");
const nhl_util_1 = require("../util/nhl.util");
let gameData;
let awayTeam;
let homeTeam;
let awayGames;
let homeGames;
window.onload = () => {
    document.body.appendChild(global_util_1.getLoadingIcon(true));
    document.getElementById('display-stats').onclick = displayStats;
    document.getElementById('display-last-ten').onclick = displayLastTen;
    const parameter = window.location.href.split('?')[1];
    if (parameter) {
        if (parameter.startsWith('id')) {
            fetchData(parameter.substring(3))
                .then(() => displayMetaData())
                .then(() => global_util_1.removeLoadingIcon());
        }
    }
};
function fetchData(gameId) {
    return nhl_api_1.getGame(gameId)
        .then(response => gameData = response.gameData)
        .then(() => nhl_api_1.getTeam(gameData.teams.away.id))
        .then(response => awayTeam = response.teams[0])
        .then(() => nhl_api_1.getTeam(gameData.teams.home.id))
        .then(response => homeTeam = response.teams[0])
        .then(() => nhl_api_1.getSchedule(gameData.teams.away.id, nhl_api_1.SEASON_START, nhl_api_1.SEASON_END))
        .then(response => awayGames = new game_helper_1.GameArrayHelper(response.dates))
        .then(() => nhl_api_1.getSchedule(gameData.teams.home.id, nhl_api_1.SEASON_START, nhl_api_1.SEASON_END))
        .then(response => homeGames = new game_helper_1.GameArrayHelper(response.dates));
}
function displayMetaData() {
    document.getElementById('details').style.display = 'block';
    document.getElementById('away-logo').src = `./images/${awayTeam.id}.gif`;
    document.getElementById('home-logo').src = `./images/${homeTeam.id}.gif`;
    displayStats();
}
function displayStats() {
    const detailsTable = document.getElementById('details-table');
    const awayTeamStats = awayTeam.teamStats[0].splits[0].stat, homeTeamStats = homeTeam.teamStats[0].splits[0].stat;
    detailsTable.innerHTML = '';
    detailsTable.appendChild(global_util_1.createTr([awayTeam.abbreviation, '@', homeTeam.abbreviation], { type: 'th' }));
    detailsTable.appendChild(global_util_1.createTr(['Regular Season'], { highlight: false, type: 'th', colspan: 3 }));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.gamesPlayed, 'Games Played', homeTeamStats.gamesPlayed]));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.wins, 'Wins', homeTeamStats.wins], { highlight: true }));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.losses, 'Losses', homeTeamStats.losses], { highlight: true, invertHighlight: true }));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.ot, 'OT', homeTeamStats.ot]));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.ptPctg, 'Point %', homeTeamStats.ptPctg], { highlight: true }));
    detailsTable.appendChild(global_util_1.createTr([' ', ' ', ' ']));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.goalsPerGame, 'Goals per Game', homeTeamStats.goalsPerGame], { highlight: true }));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.powerPlayPercentage, 'PP%', homeTeamStats.powerPlayPercentage], { highlight: true }));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.penaltyKillPercentage, 'PK%', homeTeamStats.penaltyKillPercentage], { highlight: true }));
    detailsTable.appendChild(global_util_1.createTr([' ', ' ', ' ']));
    detailsTable.appendChild(global_util_1.createTr([Math.round(awayTeamStats.shotsPerGame), 'Shots per Game', Math.round(homeTeamStats.shotsPerGame)], { highlight: true }));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.shootingPctg, 'Shooting %', homeTeamStats.shootingPctg], { highlight: true }));
    detailsTable.appendChild(global_util_1.createTr([Math.round(awayTeamStats.shotsAllowed), 'Shots Against', Math.round(homeTeamStats.shotsAllowed)], { highlight: true, invertHighlight: true }));
    detailsTable.appendChild(global_util_1.createTr([awayTeamStats.savePctg, 'Save %', homeTeamStats.savePctg], { highlight: true }));
    detailsTable.appendChild(global_util_1.createTr([' ', ' ', ' ']));
}
function displayLastTen() {
    const detailsTable = document.getElementById('details-table');
    const lastTwoWeeksAway = awayGames.final().ofPastDays(14).select();
    const lastTwoWeeksHome = homeGames.final().ofPastDays(14).select();
    const lastFiveAway = awayGames.final().last(5).select();
    const lastFiveHome = homeGames.final().last(5).select();
    detailsTable.innerHTML = '';
    detailsTable.appendChild(global_util_1.createTr([awayTeam.abbreviation, '@', homeTeam.abbreviation], { type: 'th' }));
    detailsTable.appendChild(global_util_1.createTr(['Past 2 Weeks'], { type: 'th', colspan: 3 }));
    detailsTable.appendChild(global_util_1.createTr([getRecord(lastTwoWeeksAway, awayTeam.id), 'Record', getRecord(lastTwoWeeksHome, homeTeam.id)]));
    const lastFiveTr = global_util_1.createTr(['', 'Last 5 Record', '']);
    lastFiveTr.classList.add('last-five');
    lastFiveTr.children[0].appendChild(getLastFiveGamesStreak(lastFiveAway, awayTeam.id));
    lastFiveTr.children[2].appendChild(getLastFiveGamesStreak(lastFiveHome, homeTeam.id));
    detailsTable.appendChild(lastFiveTr);
    // detailsTable.appendChild(createPointsCanvasTr(lastTenDaysAway, lastTenDaysHome));
    detailsTable.appendChild(createGoalsScoredCanvasTr(awayGames.final().ofPastDays(7).select(), homeGames.final().ofPastDays(7).select()));
}
function getRecord(iterable, teamId) {
    let w = 0, l = 0;
    iterable.forEach(g => nhl_util_1.teamHasWonGame(teamId, g) ? w += 1 : l += 1);
    return `${w}-${l}`;
}
function getLastFiveGamesStreak(iterable, teamId) {
    const container = document.createElement('div');
    iterable.forEach(g => {
        const box = document.createElement('div');
        box.classList.add('box');
        if (nhl_util_1.teamHasWonGame(teamId, g)) {
            box.classList.add('box-win');
            box.innerHTML = 'W';
        }
        else {
            box.classList.add('box-loss');
            box.innerHTML = 'L';
        }
        container.appendChild(box);
    });
    return container;
}
function getTeamFromGame(game, teamId) {
    if (game.teams.away.team.id === teamId) {
        return game.teams.away;
    }
    else {
        return game.teams.home;
    }
}
function createPointsCanvasTr(awayGames, homeGames) {
    const tr = global_util_1.createTr([''], { highlight: false, colspan: 3 });
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
                    borderColor: nhl_api_1.TEAM_COLORS[awayTeam.name].away,
                    data: awayGames.map(g => getTeamFromGame(g, awayTeam.id).leagueRecord.wins),
                    lineTension: 0,
                }, {
                    label: homeTeam.teamName,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: nhl_api_1.TEAM_COLORS[homeTeam.name].home,
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
function createGoalsScoredCanvasTr(awayGames, homeGames) {
    const tr = global_util_1.createTr([''], { highlight: false, colspan: 3 });
    const firstDate = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7));
    const labels = [];
    while (firstDate.getTime() <= new Date().getTime()) {
        labels.push(new Date(firstDate));
        firstDate.setTime(firstDate.getTime() + (1000 * 60 * 60 * 24));
    }
    var canvas = document.createElement('canvas');
    if (window.screen.width < 1000) {
        canvas.width = 1;
    }
    else {
        canvas.width = 3;
    }
    canvas.height = 1;
    canvas.style.width = '100%';
    tr.children[0].appendChild(canvas);
    var chart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels.map(d => d.toLocaleDateString('ch-de').slice(0, -5)),
            datasets: [{
                    label: awayTeam.teamName,
                    backgroundColor: nhl_api_1.TEAM_COLORS[awayTeam.name].away,
                    data: getGameData(awayTeam.id, awayGames, labels),
                    barLabel: getBarLabels(awayTeam.id, awayGames, labels)
                }, {
                    label: homeTeam.teamName,
                    backgroundColor: nhl_api_1.TEAM_COLORS[homeTeam.name].home,
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
                    var chartInstance = this.chart, ctx = chartInstance.ctx;
                    ctx.font = 'bold 10pt Consolas';
                    ctx.fillStyle = 'black';
                    ctx.textAlign = "center";
                    const stepHeight = 11;
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            var label = dataset.barLabel[index];
                            if (data === 0 || !label) {
                                return;
                            }
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
function getGameData(teamId, games, dateRange) {
    const gameData = [];
    const returnData = [];
    dateRange.forEach(date => {
        const gameDay = games.find(g => `${new Date(g.gameDate).getDate()}-${new Date(g.gameDate).getMonth()}` === `${date.getDate()}-${date.getMonth()}`);
        gameDay ? gameData.push(gameDay) : gameData.push(undefined);
    });
    gameData.forEach(g => g ? returnData.push(getGoalDiff(g, teamId)) : returnData.push(0));
    return returnData;
}
function getBarLabels(teamId, games, dateRange) {
    const gameData = [];
    const returnData = [];
    dateRange.forEach(date => {
        const gameDay = games.find(g => `${new Date(g.gameDate).getDate()}-${new Date(g.gameDate).getMonth()}` === `${date.getDate()}-${date.getMonth()}`);
        gameDay ? gameData.push(gameDay) : gameData.push(undefined);
    });
    gameData.forEach((g) => {
        if (g) {
            if (g.teams.away.team.id === teamId) {
                returnData.push(`@ ${nhl_api_1.TEAM_NAME_SHORT[g.teams.home.team.name]}`);
            }
            else {
                returnData.push(`vs. ${nhl_api_1.TEAM_NAME_SHORT[g.teams.away.team.name]}`);
            }
        }
        else {
            returnData.push(undefined);
        }
    });
    return returnData;
}
function getGoalDiff(game, teamId) {
    if (game.teams.away.team.id === teamId) {
        return game.teams.away.score - game.teams.home.score;
    }
    else {
        return game.teams.home.score - game.teams.away.score;
    }
}
