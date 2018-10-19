const API_URL = 'https://statsapi.web.nhl.com';

const STANDINGS = `${API_URL}/api/v1/standings`;
const TEAMS = `${API_URL}/api/v1/teams`;
const SCHEDULE = `${API_URL}/api/v1/schedule`;

function getStandings() {
    return fetch(STANDINGS)
        .then(response => response.json())
        .catch(err => console.error(err));
}

function getTeam(id) {
    return fetch(`${TEAMS}/${id}?expand=team.stats`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

function getScores(start, end) {
    return fetch(`${SCHEDULE}?startDate=${start}&endDate=${end}`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

function getSchedule(id, start, end) {
    return fetch(`${SCHEDULE}?teamId=${id}&startDate=${start}&endDate=${end}`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

function getRoster(id) {
    return fetch(`${TEAMS}/${id}?expand=team.roster`)
        .then(response => response.json())
        .catch(err => console.error(err));
    }