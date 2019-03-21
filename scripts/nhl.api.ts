const API_URL = 'https://statsapi.web.nhl.com/api/v1';

const STANDINGS = `${API_URL}/standings`;
const TEAMS = `${API_URL}/teams`;
const SCHEDULE = `${API_URL}/schedule`;
const GAME = `${API_URL}/game`;
const PEOPLE = `${API_URL}/people`;

export const SEASON_START = '2018-10-03';
export const SEASON_END = '2019-04-06';

export function getStandings(): Promise<NhlApi.Record.Response> {
    return fetch(STANDINGS)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export function getTeam(id: string | number): Promise<NhlApi.Team.Response> {
    return fetch(`${TEAMS}/${id}?expand=team.stats`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export function getScores(start: string, end: string): Promise<NhlApi.Schedule.Response> {
    return fetch(`${SCHEDULE}?startDate=${start}&endDate=${end}`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export function getSchedule(id: string | number, start: string, end: string): Promise<NhlApi.Schedule.Response> {
    return fetch(`${SCHEDULE}?teamId=${id}&startDate=${start}&endDate=${end}`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export function getRoster(id: string | number): Promise<NhlApi.Roster.Response> {
    return fetch(`${TEAMS}/${id}?expand=team.roster`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export function getGame(id: string): Promise<NhlApi.Game.ApiResponse> {
    return fetch(`${GAME}/${id}/feed/live`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export function getPlayer(id: string | number): Promise<NhlApi.People.Player> {
    return fetch(`${PEOPLE}/${id}`)
        .then(response => response.json())
        .then(apiJson => apiJson.people[0])
        .catch(err => console.error(err));
}

export const TEAM_NAME_SHORT: { [key: string]: string } = {
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

export const TEAM_COLORS: { [id: string]: { home: string, away: string } } = {
    'Anaheim Ducks': { home: '#F47A38', away: '#B09862' },
    'Arizona Coyotes': { home: '#8C2633', away: '#E2D6B5' },
    'Boston Bruins': { home: '#FFB81C', away: '#A2AAAD' },
    'Buffalo Sabres': { home: '#002654', away: '#ADAFAA' },
    'Carolina Hurricanes': { home: '#CC0000', away: '#A2AAAD' },
    'Calgary Flames': { home: '#C8102E', away: '#111111' },
    'Chicago Blackhawks': { home: '#CF0A2C', away: '#D18A00' },
    'Columbus Blue Jackets': { home: '#002654', away: '#A4A9AD' },
    'Colorado Avalanche': { home: '#6F263D', away: '#A2AAAD' },
    'Dallas Stars': { home: '#006847', away: '#8F8F8C' },
    'Detroit Red Wings': { home: '#CE1126', away: '#A2AAAD' },
    'Edmonton Oilers': { home: '#041E42', away: '#FF4C00' },
    'Florida Panthers': { home: '#C8102E', away: '#B9975B' },
    'Los Angeles Kings': { home: '#111111', away: '#A2AAAD' },
    'Minnesota Wild': { home: '#154734', away: '#DDCBA4' },
    'Montréal Canadiens': { home: '#AF1E2D', away: '#192168' },
    'Nashville Predators': { home: '#FFB81C', away: '#A2AAAD' },
    'New Jersey Devils': { home: '#154734', away: '#A2AAAD' },
    'New York Islanders': { home: '#00539B', away: '#A2AAAD' },
    'New York Rangers': { home: '#0038A8', away: '#A2AAAD' },
    'Ottawa Senators': { home: '#E31837', away: '#C69214' },
    'Philadelphia Flyers': { home: '#F74902', away: '#A2AAAD' },
    'Pittsburgh Penguins': { home: '#000000', away: '#CFC493' },
    'San Jose Sharks': { home: '#006D75', away: '#A2AAAD' },
    'St. Louis Blues': { home: '#002F87', away: '#A2AAAD' },
    'Tampa Bay Lightning': { home: '#002868', away: '#A2AAAD' },
    'Toronto Maple Leafs': { home: '#003E7E', away: '#A2AAAD' },
    'Vancouver Canucks': { home: '#001F5B', away: '#99999A' },
    'Vegas Golden Knights': { home: '#333F42', away: '#B4975A' },
    'Winnipeg Jets': { home: '#041E42', away: '#8E9090' },
    'Washington Capitals': { home: '#C8102E', away: '#A2AAAD' },
}
