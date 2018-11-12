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

const TEAM_NAME_SHORT = {
    'Anaheim Ducks': 'ANA',
    'Arizona Coyotes': 'ARI',
    'Boston Bruins': 'BOS',
    'Buffalo Sabres': 'BUF',
    'Carolina Hurricanes': 'CAR',
    'Calgary Flames': 'CGY',
    'Chicago Blackhawks': 'CHI',
    'Columbus Blue Jackets': 'CBJ',
    'Colorado Avalanche': 'COL',
    'Dallas Stars': 'DAL',
    'Detroit Red Wings': 'DET',
    'Edmonton Oilers': 'EDM',
    'Florida Panthers': 'FLA',
    'Los Angeles Kings': 'LAK',
    'Minnesota Wild': 'MIN',
    'Montréal Canadiens': 'MTL',
    'Nashville Predators': 'NSH',
    'New Jersey Devils': 'NJD',
    'New York Islanders': 'NYI',
    'New York Rangers': 'NYR',
    'Ottawa Senators': 'OTT',
    'Philadelphia Flyers': 'PHI',
    'Pittsburgh Penguins': 'PIT',
    'San Jose Sharks': 'SJS',
    'St. Louis Blues': 'STL',
    'Tampa Bay Lightning': 'TBL',
    'Toronto Maple Leafs': 'TOR',
    'Vancouver Canucks': 'VAN',
    'Vegas Golden Knights': 'VGK',
    'Winnipeg Jets': 'WPG',
    'Washington Capitals': 'WSH',
};
