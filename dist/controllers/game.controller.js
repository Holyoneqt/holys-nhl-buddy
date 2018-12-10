"use strict";
let gameData;
let awayTeam;
let homeTeam;
let allAwayGames;
let allHomeGames;
window.onload = () => {
    document.body.appendChild(getLoadingIcon());
    const parameter = window.location.href.split('?')[1];
    if (parameter) {
        if (parameter.startsWith('id')) {
            fetchData(parameter.substring(3))
                .then(() => {
                console.log(gameData);
                console.log(awayTeam);
                console.log(homeTeam);
            })
                .then(() => displayMetaData());
        }
    }
};
function fetchData(gameId) {
    return getGame(gameId)
        .then(response => gameData = response.gameData)
        .then(() => getTeam(gameData.teams.away.id))
        .then(response => awayTeam = response.teams[0])
        .then(() => getTeam(gameData.teams.home.id))
        .then(response => homeTeam = response.teams[0])
        .then(() => getSchedule(gameData.teams.away.id, SEASON_START, SEASON_END))
        .then(response => allAwayGames = response.dates)
        .then(() => getSchedule(gameData.teams.home.id, SEASON_START, SEASON_END))
        .then(response => allHomeGames = response.dates);
}
function displayMetaData() {
    document.getElementById('details').style.display = 'block';
    document.getElementById('away-logo').src = `./images/${awayTeam.id}.gif`;
    document.getElementById('home-logo').src = `./images/${homeTeam.id}.gif`;
    displayStats();
}
function displayStats() {
    const detailsTable = document.getElementById('details-table');
    document.getElementById('loading').style.display = 'none';
    const awayTeamStats = awayTeam.teamStats[0].splits[0].stat, homeTeamStats = homeTeam.teamStats[0].splits[0].stat;
    detailsTable.innerHTML = '';
    detailsTable.appendChild(createTr([awayTeam.abbreviation, '@', homeTeam.abbreviation], false, 3, 'th'));
    detailsTable.appendChild(createTr(['Regular Season'], false, 1, 'th', 3));
    detailsTable.appendChild(createTr([awayTeamStats.gamesPlayed, 'Games Played', homeTeamStats.gamesPlayed], false));
    detailsTable.appendChild(createTr([awayTeamStats.wins, 'Wins', homeTeamStats.wins]));
    detailsTable.appendChild(createTr([awayTeamStats.losses, 'Losses', homeTeamStats.losses]));
    detailsTable.appendChild(createTr([awayTeamStats.ot, 'OT', homeTeamStats.ot]));
    detailsTable.appendChild(createTr([awayTeamStats.ptPctg, 'Point %', homeTeamStats.ptPctg]));
    detailsTable.appendChild(createTr([' ', ' ', ' '], false));
    detailsTable.appendChild(createTr([awayTeamStats.goalsPerGame, 'Goals per Game', homeTeamStats.goalsPerGame]));
    detailsTable.appendChild(createTr([awayTeamStats.powerPlayPercentage, 'PP%', homeTeamStats.powerPlayPercentage]));
    detailsTable.appendChild(createTr([awayTeamStats.penaltyKillPercentage, 'PK%', homeTeamStats.penaltyKillPercentage]));
    detailsTable.appendChild(createTr([' ', ' ', ' '], false));
    detailsTable.appendChild(createTr([Math.round(awayTeamStats.shotsPerGame), 'Shots per Game', Math.round(homeTeamStats.shotsPerGame)]));
    detailsTable.appendChild(createTr([awayTeamStats.shootingPctg, 'Shooting %', homeTeamStats.shootingPctg]));
    detailsTable.appendChild(createTr([Math.round(awayTeamStats.shotsAllowed), 'Shots Against', Math.round(homeTeamStats.shotsAllowed)]));
    detailsTable.appendChild(createTr([awayTeamStats.savePctg, 'Save %', homeTeamStats.savePctg]));
    detailsTable.appendChild(createTr([' ', ' ', ' '], false));
}
function displayLastTen() {
    const detailsTable = document.getElementById('details-table');
    document.getElementById('loading').style.display = 'none';
    const tenDaysAgo = new Date(new Date().setTime(new Date().getTime() - (1000 * 60 * 60 * 24 * 14)));
    console.log(tenDaysAgo);
    const lastTenDaysAway = allAwayGames.filter(date => date.games[0].status.detailedState === 'Final').map(date => date.games[0]).filter(game => new Date(game.gameDate).getTime() > tenDaysAgo.getTime());
    const lastTenDaysHome = allHomeGames.filter(g => g.games[0].status.detailedState === 'Final').map(date => date.games[0]).filter(game => new Date(game.gameDate).getTime() > tenDaysAgo.getTime());
    const lastFiveAway = [...lastTenDaysAway].splice(-5);
    const lastFiveHome = [...lastTenDaysHome].splice(-5);
    detailsTable.innerHTML = '';
    detailsTable.appendChild(createTr([awayTeam.abbreviation, '@', homeTeam.abbreviation], false, 3, 'th'));
    detailsTable.appendChild(createTr(['Past 2 Weeks'], false, 1, 'th', 3));
    detailsTable.appendChild(createTr([getRecord(lastTenDaysAway, awayTeam.id), 'Record', getRecord(lastTenDaysHome, homeTeam.id)], false));
    const lastFiveTr = createTr(['', 'Last 5 Record', ''], false);
    lastFiveTr.classList.add('last-five');
    lastFiveTr.children[0].appendChild(getLastFiveGamesStreak(lastFiveAway, awayTeam.id));
    lastFiveTr.children[2].appendChild(getLastFiveGamesStreak(lastFiveHome, homeTeam.id));
    detailsTable.appendChild(lastFiveTr);
    // detailsTable.appendChild(createPointsCanvasTr(lastTenDaysAway, lastTenDaysHome));
    detailsTable.appendChild(createGoalsScoredCanvasTr(lastTenDaysAway, lastTenDaysHome));
}
function createTr(dataArray, highlight = true, numData = 3, type = 'td', colspan) {
    const tr = document.createElement('tr');
    for (let i = 0; i < numData; i++) {
        const td = document.createElement(type);
        if (colspan) {
            td.colSpan = colspan;
        }
        td.innerHTML = dataArray[i];
        tr.appendChild(td);
    }
    if (highlight && tr.children.length > 1) {
        if (parseFloat(tr.children[0].innerHTML) === parseFloat(tr.children[2].innerHTML)) {
            tr.children[0].style.color = 'royalblue';
            tr.children[2].style.color = 'royalblue';
        }
        else if (parseFloat(tr.children[0].innerHTML) > parseFloat(tr.children[2].innerHTML)) {
            tr.children[0].style.color = 'green';
            tr.children[2].style.color = 'orangered';
        }
        else {
            tr.children[2].style.color = 'green';
            tr.children[0].style.color = 'orangered';
        }
    }
    return tr;
}
function getRecord(iterable, teamId) {
    let w = 0, l = 0;
    iterable.forEach(g => {
        if (g.teams.away.team.id === teamId) {
            w += (g.teams.away.score > g.teams.home.score) ? 1 : 0;
            l += (g.teams.away.score > g.teams.home.score) ? 0 : 1;
        }
        else {
            w += (g.teams.away.score < g.teams.home.score) ? 1 : 0;
            l += (g.teams.away.score < g.teams.home.score) ? 0 : 1;
        }
    });
    return `${w}-${l}`;
}
function getLastFiveGamesStreak(iterable, teamId) {
    const container = document.createElement('div');
    iterable.forEach(g => {
        const box = document.createElement('div');
        box.classList.add('box');
        if (g.teams.away.team.id === teamId) {
            if (g.teams.away.score > g.teams.home.score) {
                box.classList.add('box-win');
                box.innerHTML = 'W';
            }
            else {
                box.classList.add('box-loss');
                box.innerHTML = 'L';
            }
        }
        else {
            if (g.teams.away.score < g.teams.home.score) {
                box.classList.add('box-win');
                box.innerHTML = 'W';
            }
            else {
                box.classList.add('box-loss');
                box.innerHTML = 'L';
            }
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
    const tr = createTr([''], false, 1, 'td', 3);
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
function createGoalsScoredCanvasTr(awayGames, homeGames) {
    const tr = createTr([''], false, 1, 'td', 3);
    let firstDate = new Date(awayGames[0].gameDate).getTime() > new Date(homeGames[0].gameDate).getTime() ? new Date(homeGames[0].gameDate) : new Date(homeGames[0].gameDate);
    var labels = [];
    while (firstDate.getTime() <= new Date().getTime()) {
        labels.push(new Date(firstDate));
        firstDate.setTime(firstDate.getTime() + (1000 * 60 * 60 * 24));
    }
    var canvas = document.createElement('canvas');
    canvas.style.height = '150px';
    canvas.style.width = '100%';
    tr.children[0].appendChild(canvas);
    var chart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels.map(d => d.toLocaleDateString('ch-de').slice(0, -5)),
            datasets: [{
                    label: awayTeam.teamName,
                    backgroundColor: TEAM_COLORS[awayTeam.name].away,
                    data: getGameData(awayTeam.id, awayGames, labels),
                }, {
                    label: homeTeam.teamName,
                    backgroundColor: TEAM_COLORS[homeTeam.name].home,
                    data: getGameData(homeTeam.id, homeGames, labels),
                }]
        },
        options: {
            title: { text: 'Goal diff. (Last 10 Games)', display: true }
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
function getGoalDiff(game, teamId) {
    if (game.teams.away.team.id === teamId) {
        return game.teams.away.score - game.teams.home.score;
    }
    else {
        return game.teams.home.score - game.teams.away.score;
    }
}
//# sourceMappingURL=game.controller.js.map