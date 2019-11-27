"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nhl_api_1 = require("../nhl.api");
const global_util_1 = require("../util/global.util");
const game_helper_1 = require("../util/helper/game.helper");
const nhl_util_1 = require("../util/nhl.util");
const date = new Date();
date.setTime(new Date().getTime() - (1000 * 60 * 60 * 24));
let games = [];
// All games of a team based on the api-call
let gamesOfTeam = {};
let selectedGame;
window.onload = () => {
    global_util_1.registerSidenav();
    displayDate(date.toLocaleDateString());
    document.getElementById('prev').onclick = () => {
        date.setTime(date.getTime() - (1000 * 60 * 60 * 24));
        displayDate(date.toLocaleDateString());
        getScoresOfDay(date);
    };
    document.getElementById('next').onclick = () => {
        date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
        displayDate(date.toLocaleDateString());
        getScoresOfDay(date);
    };
    getScoresOfDay(date);
};
function getScoresOfDay(date) {
    nhl_api_1.getScores(nhl_util_1.getNhlApiDate(date), nhl_util_1.getNhlApiDate(date))
        .then(j => games = j.dates[0].games)
        .then(() => displayGames(games));
}
function displayGames(gameList) {
    var gamesList = document.getElementById('games');
    gamesList.innerHTML = '';
    gameList.forEach(g => {
        var home = g.teams.home;
        var away = g.teams.away;
        var li = document.createElement('li');
        li.style.height = '60px';
        li.style.padding = '20px 16px';
        li.classList.add('hoverable-item');
        li.onclick = () => {
            selectedGame = g;
            displayExpandedScore(li, home.team.id, away.team.id);
        };
        var text = document.createElement('span');
        text.innerHTML = `${away.score} : ${home.score}`;
        text.style.margin = 'auto 8px';
        const imgHome = document.createElement('img');
        imgHome.src = `./images/${home.team.id}.gif`;
        imgHome.classList.add('w3-bar-item');
        imgHome.style.width = '40px';
        imgHome.style.height = '25px';
        const imgAway = document.createElement('img');
        imgAway.src = `./images/${away.team.id}.gif`;
        imgAway.classList.add('w3-bar-item');
        imgAway.style.width = '40px';
        imgAway.style.height = '25px';
        li.appendChild(imgAway);
        li.appendChild(text);
        li.appendChild(imgHome);
        gamesList.appendChild(li);
    });
}
function displayDate(date) {
    document.getElementById('date').innerHTML = date;
}
function displayExpandedScore(listItem, homeId, awayId) {
    const expandedPanel = document.createElement('li');
    expandedPanel.classList.add('expanded-score-visible');
    expandedPanel.appendChild(global_util_1.getLoadingIcon());
    if (document.getElementsByClassName('expanded-score-visible').length > 0) {
        document.getElementsByClassName('expanded-score-visible')[0].remove();
    }
    const list = document.getElementById('games');
    for (var i = 0; i < list.children.length; i++) {
        if (list.children[i] === listItem) {
            list.insertBefore(expandedPanel, list.children[i + 1]);
            break;
        }
    }
    let homeTeamGames, awayTeamGames, rivalry, lastFive;
    nhl_api_1.getSchedule(homeId, nhl_api_1.SEASON_START, nhl_api_1.SEASON_END)
        .then(homeResponse => homeTeamGames = mapGames(homeResponse, homeId))
        .then(() => nhl_api_1.getSchedule(awayId, nhl_api_1.SEASON_START, nhl_api_1.SEASON_END))
        .then(awayResponse => awayTeamGames = mapGames(awayResponse, awayId))
        .then(() => rivalry = getRivalry(awayTeamGames, homeTeamGames))
        .then(() => {
        const detailTable = document.createElement('table');
        detailTable.style.display = 'inline-block';
        const headerRow = document.createElement('tr');
        const headerRowTitle = document.createElement('th');
        headerRowTitle.colSpan = 3;
        headerRowTitle.innerHTML = 'Detailed Stats';
        headerRow.appendChild(headerRowTitle);
        detailTable.appendChild(headerRow);
        detailTable.appendChild(createTr(3, ['Away', '', 'Home'], 'th'));
        detailTable.appendChild(createTr(3, [awayTeamGames.teamName, '', homeTeamGames.teamName], 'th'));
        detailTable.appendChild(createTr(3, [awayTeamGames.away.played, 'Games Played', homeTeamGames.home.played], 'td'));
        detailTable.appendChild(createTr(3, [`${awayTeamGames.away.won} (${awayTeamGames.away.winPercent}%)`, 'Games Won', `${homeTeamGames.home.won} (${homeTeamGames.home.winPercent}%)`], 'td'));
        detailTable.appendChild(createTr(3, [awayTeamGames.away.avgGoals, 'Avg. Goals', homeTeamGames.home.avgGoals], 'td'));
        detailTable.appendChild(createTr(3, [getLast(5, awayId), 'Last 5', getLast(5, homeId)], 'td'));
        const sepereatorRow = createTr(3, ['', 'Direct Encounters', ''], 'th');
        // sepereatorRow.children[1].style.paddingTop = '18px';
        detailTable.appendChild(sepereatorRow);
        if (rivalry.length === 0) {
            detailTable.appendChild(createTr(3, ['', 'None', ''], 'td'));
        }
        rivalry.forEach(rivalryGame => {
            const tr = document.createElement('tr');
            const awayTd = document.createElement('td');
            var awayText = document.createElement('span');
            awayText.innerHTML = `${rivalryGame.away.score}`;
            awayText.style.margin = 'auto 8px';
            const imgAway = document.createElement('img');
            imgAway.src = `./images/${rivalryGame.away.teamId}.gif`;
            imgAway.classList.add('w3-bar-item');
            imgAway.style.width = '40px';
            imgAway.style.height = '25px';
            awayTd.appendChild(imgAway);
            awayTd.appendChild(awayText);
            const emptyTd = document.createElement('td');
            const homeTd = document.createElement('td');
            var homeText = document.createElement('span');
            homeText.innerHTML = `${rivalryGame.home.score}`;
            homeText.style.margin = 'auto 8px';
            const imgHome = document.createElement('img');
            imgHome.src = `./images/${rivalryGame.home.teamId}.gif`;
            imgHome.classList.add('w3-bar-item');
            imgHome.style.width = '40px';
            imgHome.style.height = '25px';
            homeTd.appendChild(homeText);
            homeTd.appendChild(imgHome);
            tr.appendChild(awayTd);
            tr.appendChild(emptyTd);
            tr.appendChild(homeTd);
            detailTable.appendChild(tr);
        });
        const viewDetailsTr = document.createElement('tr');
        const viewDetailsTd = document.createElement('td');
        viewDetailsTd.colSpan = 3;
        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.innerHTML = 'View all Details';
        viewDetailsButton.classList.add('w3-btn', 'w3-small', 'w3-light-green');
        viewDetailsButton.onclick = () => window.location.href = `./game.html?id=${selectedGame.gamePk}`;
        viewDetailsTd.appendChild(viewDetailsButton);
        viewDetailsTr.appendChild(viewDetailsTd);
        detailTable.appendChild(viewDetailsTr);
        expandedPanel.innerHTML = '';
        expandedPanel.appendChild(detailTable);
    });
}
function mapGames(apiResponse, teamId) {
    const allGames = new game_helper_1.GameArrayHelper(apiResponse.dates);
    gamesOfTeam[teamId] = allGames;
    const finishedGames = allGames.final().select();
    const homeGames = allGames.final().homeGamesOfTeam(teamId).select();
    const wonAtHome = homeGames.filter(game => game.teams.home.score > game.teams.away.score);
    const awayGames = allGames.final().awayGamesOfTeam(teamId).select();
    const wonAway = awayGames.filter(game => game.teams.home.score < game.teams.away.score);
    let mapped = {
        teamName: homeGames[0].teams.home.team.name,
        finishedGames: finishedGames,
        home: {
            played: homeGames.length,
            won: wonAtHome.length,
            winPercent: round((wonAtHome.length * 100) / homeGames.length),
            avgGoals: avgGoals('home', homeGames),
        },
        away: {
            played: awayGames.length,
            won: wonAway.length,
            winPercent: round((wonAway.length * 100) / awayGames.length),
            avgGoals: avgGoals('away', awayGames),
        },
    };
    return mapped;
}
function getRivalry(away, home) {
    const rGames = away.finishedGames.filter(game => game.teams.home.team.name === home.teamName || game.teams.away.team.name === home.teamName);
    const rivalry = [];
    rGames.forEach(game => rivalry.push({
        away: {
            teamId: game.teams.away.team.id,
            score: game.teams.away.score
        },
        home: {
            teamId: game.teams.home.team.id,
            score: game.teams.home.score
        }
    }));
    return rivalry;
}
function getLast(numGames, teamId) {
    const lastTen = gamesOfTeam[teamId].final().last(numGames).select();
    let w = 0, l = 0;
    lastTen.forEach(g => nhl_util_1.teamHasWonGame(teamId, g) ? w++ : l++);
    return `${w}-${l}`;
}
function avgGoals(type, games) {
    let goals = 0;
    if (type === 'home') {
        games.forEach(game => goals += game.teams.home.score);
    }
    else if (type === 'away') {
        games.forEach(game => goals += game.teams.away.score);
    }
    return round(goals / games.length);
}
function round(num) {
    return Math.round(num * 10) / 10;
}
function createTr(numData, dataArray, thOrTd) {
    const tr = document.createElement('tr');
    for (let i = 0; i < numData; i++) {
        const td = document.createElement(thOrTd);
        td.innerHTML = dataArray[i];
        tr.appendChild(td);
    }
    return tr;
}
