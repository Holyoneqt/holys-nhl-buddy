"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nhl_api_1 = require("../nhl.api");
const global_util_1 = require("../util/global.util");
const nhl_api_2 = require("./../nhl.api");
let divisionStandings = [];
let conferenceStandings = [];
let leagueStandings = [];
window.onload = () => {
    global_util_1.registerSidenav();
    document.getElementById('displayDivisions').onclick = () => displayDivisionStandings();
    document.getElementById('displayConferences').onclick = () => displayConferenceStandings();
    document.getElementById('displayLeague').onclick = () => displayLeagueStandings();
    nhl_api_1.getStandings()
        .then(json => divisionStandings = json.records)
        .then(() => displayDivisionStandings())
        .then(() => conferenceStandings = [[...divisionStandings[0].teamRecords, ...divisionStandings[1].teamRecords], [...divisionStandings[2].teamRecords, ...divisionStandings[3].teamRecords]])
        .then(() => leagueStandings = [...divisionStandings[0].teamRecords, ...divisionStandings[1].teamRecords, ...divisionStandings[2].teamRecords, ...divisionStandings[3].teamRecords])
        .then(() => leagueStandings.sort((a, b) => a.leagueRank - b.leagueRank));
};
function displayDivisionStandings() {
    document.getElementById('divisions').style.display = 'table';
    document.getElementById('conferences').style.display = 'none';
    document.getElementById('league').style.display = 'none';
    for (let i = 0; i < divisionStandings.length; i++) {
        const divisionContainer = document.getElementById(`division-${i}`);
        divisionContainer.innerHTML = '';
        const division = divisionStandings[i];
        const title = document.createElement('h3');
        title.innerHTML = division.division.name;
        title.classList.add('w3-center');
        divisionContainer.appendChild(title);
        divisionContainer.appendChild(createStandingTable(division.teamRecords, true));
    }
}
function displayConferenceStandings() {
    document.getElementById('divisions').style.display = 'none';
    document.getElementById('conferences').style.display = 'table';
    document.getElementById('league').style.display = 'none';
    const conferenceNames = ['Eastern', 'Western'];
    for (let i = 0; i < conferenceStandings.length; i++) {
        const conferenceContainer = document.getElementById(`conference-${i}`);
        conferenceContainer.innerHTML = '';
        const conference = conferenceStandings[i];
        conference.sort((a, b) => a.conferenceRank - b.conferenceRank);
        const title = document.createElement('h3');
        title.innerHTML = conferenceNames[i];
        title.classList.add('w3-center');
        conferenceContainer.appendChild(title);
        conferenceContainer.appendChild(createStandingTable(conference, true));
    }
}
function displayLeagueStandings() {
    document.getElementById('divisions').style.display = 'none';
    document.getElementById('conferences').style.display = 'none';
    document.getElementById('league').style.display = 'table';
    document.getElementById('league-standing').innerHTML = '';
    document.getElementById('league-standing').appendChild(createStandingTable(leagueStandings, true));
}
function createStandingTable(teamRecords, details) {
    const list = document.createElement('ul');
    list.classList.add('w3-ul');
    teamRecords.forEach((t) => {
        const listItem = document.createElement('li');
        listItem.classList.add('w3-bar');
        listItem.classList.add('hoverable-item');
        listItem.style.fontSize = '12px';
        listItem.style.border = localStorage.getItem('fav-team') == t.team.id ? '2px solid #70C1B3' : '';
        listItem.onclick = () => {
            window.location.href = `./team.html?id=${t.team.id}`;
        };
        const img = document.createElement('img');
        img.src = `./images/${t.team.id}.gif`;
        img.classList.add('w3-bar-item');
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.cssFloat = 'left';
        img.style.padding = '8px 2px';
        listItem.appendChild(img);
        const teamName = document.createElement('div');
        teamName.classList.add('w3-bar-item');
        if (t.wildCardRank === '0') {
            teamName.style.background = 'rgba(178, 219, 191, 0.5)';
        }
        else if (t.wildCardRank === '1') {
            teamName.style.background = 'rgba(255, 255, 88, 0.5)';
        }
        else if (t.wildCardRank === '2') {
            teamName.style.background = 'rgba(255, 22, 84, 0.5)';
        }
        teamName.innerHTML = `${nhl_api_2.TEAM_NAME_SHORT[t.team.name] || t.team.name}`;
        listItem.appendChild(teamName);
        const points = document.createElement('div');
        points.classList.add('w3-bar-item');
        points.style.cssFloat = 'right';
        points.innerHTML = `${t.points} pts.`;
        listItem.appendChild(points);
        const record = document.createElement('div');
        record.classList.add('w3-bar-item');
        record.style.cssFloat = 'right';
        record.innerHTML = `${t.leagueRecord.wins}-${t.leagueRecord.losses}-${t.leagueRecord.ot} (${t.streak.streakCode})`;
        listItem.appendChild(record);
        const plusMinusNumber = t.goalsScored - t.goalsAgainst;
        const plusMinus = document.createElement('div');
        plusMinus.classList.add('w3-bar-item');
        plusMinus.style.cssFloat = 'right';
        plusMinus.style.color = plusMinusNumber < 0 ? 'red' : 'green';
        plusMinus.innerHTML = plusMinusNumber < 0 ? plusMinusNumber.toString() : `+${plusMinusNumber}`;
        listItem.appendChild(plusMinus);
        if (details) {
            const gamesPlayed = document.createElement('div');
            gamesPlayed.classList.add('w3-bar-item');
            gamesPlayed.style.cssFloat = 'right';
            gamesPlayed.innerHTML = `${t.gamesPlayed} GP`;
            listItem.appendChild(gamesPlayed);
        }
        list.appendChild(listItem);
    });
    return list;
}
