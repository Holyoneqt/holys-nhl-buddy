"use strict";
let gameData;
let awayTeam;
let homeTeam;
window.onload = () => {
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
        .then(response => homeTeam = response.teams[0]);
}
function displayMetaData() {
    document.getElementById('details').style.display = 'block';
    document.getElementById('away-logo').src = `./images/${awayTeam.id}.gif`;
    document.getElementById('home-logo').src = `./images/${homeTeam.id}.gif`;
    const detailsTable = document.getElementById('details-table');
    document.getElementById('loading').style.display = 'none';
    const awayTeamStats = awayTeam.teamStats[0].splits[0].stat, homeTeamStats = homeTeam.teamStats[0].splits[0].stat;
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
    document.getElementById('awayTeamName').innerHTML = awayTeam.abbreviation;
    document.getElementById('homeTeamName').innerHTML = homeTeam.abbreviation;
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
//# sourceMappingURL=game.controller.js.map