let gameData: NhlApi.Game.GameData;
let awayTeam: NhlApi.Team.Team;
let homeTeam: NhlApi.Team.Team;
let allAwayGames: NhlApi.Schedule.Date[];
let allHomeGames: NhlApi.Schedule.Date[];

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

function fetchData(gameId: string): Promise<any> {
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

function displayMetaData(): void {
    document.getElementById('details').style.display = 'block';

    document.getElementById('away-logo').src = `./images/${awayTeam.id}.gif`
    document.getElementById('home-logo').src = `./images/${homeTeam.id}.gif`

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

    const lastTenAway = allAwayGames.filter(date => date.games[0].status.detailedState === 'Final').splice(-10).map(date => date.games[0]);
    const lastTenHome = allHomeGames.filter(g => g.games[0].status.detailedState === 'Final').splice(-10).map(date => date.games[0]);
    const lastFiveAway = [...lastTenAway].splice(-5);
    const lastFiveHome = [...lastTenHome].splice(-5);
    console.log(lastTenAway, lastTenHome);

    detailsTable.innerHTML = '';
    detailsTable.appendChild(createTr([awayTeam.abbreviation, '@', homeTeam.abbreviation], false, 3, 'th'));
    detailsTable.appendChild(createTr(['Last 10 Games'], false, 1, 'th', 3));
    detailsTable.appendChild(createTr([getRecord(lastTenAway, awayTeam.id), 'Record', getRecord(lastTenHome, homeTeam.id)], false));
    detailsTable.appendChild(createTr([getRecordAsString(lastFiveAway, awayTeam.id), 'Last 5 Record', getRecordAsString(lastFiveHome, homeTeam.id)], false));
    detailsTable.appendChild(createPointsCanvasTr(lastTenAway, lastTenHome));
    detailsTable.appendChild(createGoalsScoredCanvasTr(lastTenAway, lastTenHome));

}

function createTr(dataArray: any[], highlight: boolean = true, numData: number = 3, type: 'th' | 'td' = 'td', colspan?: number) {
    const tr = document.createElement('tr');

    for (let i = 0; i < numData; i++) {
        const td = document.createElement(type);
        if (colspan) { td.colSpan = colspan; }
        td.innerHTML = dataArray[i];
        tr.appendChild(td);
    }

    if (highlight && tr.children.length > 1) {

        if (parseFloat(tr.children[0].innerHTML) === parseFloat(tr.children[2].innerHTML)) {
            tr.children[0].style.color = 'royalblue';
            tr.children[2].style.color = 'royalblue';
        } else if (parseFloat(tr.children[0].innerHTML) > parseFloat(tr.children[2].innerHTML)) {
            tr.children[0].style.color = 'green';
            tr.children[2].style.color = 'orangered';
        } else {
            tr.children[2].style.color = 'green';
            tr.children[0].style.color = 'orangered';
        }
    }

    return tr;
}

function getRecord(iterable: NhlApi.Schedule.Game[], teamId: number): string {
    let w = 0, l = 0;
    iterable.forEach(g => {
        if (g.teams.away.team.id === teamId) {
            w += (g.teams.away.score > g.teams.home.score) ? 1 : 0;
            l += (g.teams.away.score > g.teams.home.score) ? 0 : 1;
        } else {
            w += (g.teams.away.score < g.teams.home.score) ? 1 : 0;
            l += (g.teams.away.score < g.teams.home.score) ? 0 : 1;
        }
    });
    return `${w}-${l}`;
}

function getRecordAsString(iterable: NhlApi.Schedule.Game[], teamId: number): string {
    let returnValue = '';
    iterable.forEach(g => {
        if (g.teams.away.team.id === teamId) {
            returnValue += (g.teams.away.score > g.teams.home.score) ? 'W-' : 'L-';
        } else {
            returnValue += (g.teams.away.score < g.teams.home.score) ? 'W-' : 'L-';
        }
    });
    return returnValue.substring(0, returnValue.length - 1);
}

function getTeamFromGame(game: NhlApi.Schedule.Game, teamId: number): NhlApi.Schedule.Away | NhlApi.Schedule.Home {
    if (game.teams.away.team.id === teamId) { return game.teams.away; }
    else { return game.teams.home; }
}


function createPointsCanvasTr(awayGames: NhlApi.Schedule.Game[], homeGames: NhlApi.Schedule.Game[]) {
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
                borderColor: 'rgb(255, 99, 132)',
                data: awayGames.map(g => getTeamFromGame(g, awayTeam.id).leagueRecord.wins * 2),
                lineTension: 0,
            }, {
                label: homeTeam.teamName,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(0, 99, 132)',
                data: homeGames.map(g => getTeamFromGame(g, homeTeam.id).leagueRecord.wins * 2),
                lineTension: 0,
            }]
        },
        options: {
            title: { text: 'Points over last 10 Games', display: true }
        }
    });
    return tr;
}

function createGoalsScoredCanvasTr(awayGames: NhlApi.Schedule.Game[], homeGames: NhlApi.Schedule.Game[]) {
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
                data: awayGames.map(g => getTeamFromGame(g, awayTeam.id).score),
                lineTension: 0,
            },{
                label: homeTeam.teamName,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: TEAM_COLORS[homeTeam.name].home,
                data: homeGames.map(g => getTeamFromGame(g, homeTeam.id).score),
                lineTension: 0,
            }]
        },
        options: {
            title: { text: 'Goals scored in last 10 Games', display: true }
        }
    });
    return tr;
}
