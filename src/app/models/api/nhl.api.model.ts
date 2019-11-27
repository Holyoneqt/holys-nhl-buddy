export interface NhlApiRecordResponse {
    copyright: string;
    records: NhlApiRecord[];
}

export interface NhlApiRecord {
    standingsType: string;
    league: NhlApiLeague;
    division: NhlApiDivision;
    conference: NhlApiConference;
    teamRecords: NhlApiTeamRecord[];
}

export interface NhlApiLeague {
    id: number;
    name: string;
    link: string;
}

export interface NhlApiDivision {
    id: number;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
}

export interface NhlApiConference {
    id: number;
    name: string;
    link: string;
}

export interface NhlApiTeamRecord {
    team: NhlApiTeam;
    leagueRecord: NhlApiLeagueRecord;
    goalsAgainst: number;
    goalsScored: number;
    points: number;
    divisionRank: string;
    conferenceRank: string;
    leagueRank: string;
    wildCardRank: string;
    row: number;
    gamesPlayed: number;
    streak: NhlApiStreak;
    lastUpdated: Date;
}

export interface NhlApiTeam {
    id: number;
    name: string;
    link: string;

    venue?: NhlApiVenue;
    abbreviation?: string;
    teamName?: string;
    locationName?: string;
    firstYearOfPlay?: string;
    division?: NhlApiDivision;
    conference?: NhlApiConference;
    franchise?: NhlApiFranchise;
    teamStats?: NhlApiTeamStat[];
    shortName?: string;
    officialSiteUrl?: string;
    franchiseId?: number;
    active?: boolean;
    roster?: NhlApiRosterMetadata;
}

export interface NhlApiLeagueRecord {
    wins: number;
    losses: number;
    ot: number;
    type: string;
}

export interface NhlApiStreak {
    streakType: string;
    streakNumber: number;
    streakCode: string;
}

export interface NhlApiTeamResponse {
    copyright: string;
    teams: NhlApiTeam[];
}

export interface NhlApiFranchise {
    franchiseId: number;
    teamName: string;
    link: string;
}

export interface NhlApiTeamStat {
    type: NhlApiType;
    splits: NhlApiSplit[];
}

export interface NhlApiSplit {
    stat: NhlApiStat;
    team: NhlApiTeam;
}

export interface NhlApiStat {
    gamesPlayed: number;
    wins: any;
    losses: any;
    ot: any;
    pts: any;
    ptPctg: string;
    goalsPerGame: any;
    goalsAgainstPerGame: any;
    evGGARatio: any;
    powerPlayPercentage: string;
    powerPlayGoals: any;
    powerPlayGoalsAgainst: any;
    powerPlayOpportunities: any;
    penaltyKillPercentage: string;
    shotsPerGame: any;
    shotsAllowed: any;
    winScoreFirst: any;
    winOppScoreFirst: any;
    winLeadFirstPer: any;
    winLeadSecondPer: any;
    winOutshootOpp: any;
    winOutshotByOpp: any;
    faceOffsTaken: any;
    faceOffsWon: any;
    faceOffsLost: any;
    faceOffWinPercentage: string;
    shootingPctg: number;
    savePctg: number;
    penaltyKillOpportunities: string;
    savePctRank: string;
    shootingPctRank: string;
}

export interface NhlApiVenue {
    name: string;
    link: string;
    city: string;
    timeZone: NhlApiTimeZone;
}

export interface NhlApiTimeZone {
    id: string;
    offset: number;
    tz: string;
}

export interface NhlApiType {
    displayName: string;
}

export interface NhlApiScheduleResponse {
    copyright: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalMatches: number;
    dates: NhlApiDate[];
}

export interface NhlApiDate {
    date: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalMatches: number;
    games: NhlApiGame[];
    events: any[];
    matches: any[];
}

export interface NhlApiGame {
    gamePk: number;
    link: string;
    gameType: string;
    season: string;
    gameDate: string;
    status: NhlApiStatus;
    teams: {
        away: NhlApiGameTeam;
        home: NhlApiGameTeam;
    };
    venue: NhlApiVenue;
    content: {
        link: string;
    };
}

export interface NhlApiGameTeam {
    leagueRecord: NhlApiLeagueRecord;
    score: number;
    team: NhlApiTeam;
}

export interface NhlApiStatus {
    abstractGameState: string;
    codedGameState: string;
    detailedState: string;
    statusCode: string;
    startTimeTBD: boolean;
}

export interface NhlApiRosterResponse {
    copyright: string;
    teams: NhlApiTeam[];
}

export interface NhlApiRosterMetadata {
    roster: NhlApiRoster[];
    link: string;
}

export interface NhlApiRoster {
    person: NhlApiPerson;
    jerseyNumber: string;
    position: NhlApiPosition;
}

export interface NhlApiPerson {
    id: number;
    fullName: string;
    link: string;
}

export interface NhlApiPosition {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}


export interface NhlApiPeopleResponse {
    copyright: string;
    people: NhlApiPlayer[];
}

export interface NhlApiPlayer {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    nationality: string;
    height: string;
    weight: number;
    active: boolean;
    alternateCaptain: boolean;
    captain: boolean;
    rookie: boolean;
    shootsCatches: string;
    rosterStatus: string;
    currentTeam: NhlApiTeam;
    primaryPosition: NhlApiPosition;
}

export interface NhlApiPosition {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface NhlApiSeason {
    seasonId: string;
    regularSeasonStartDate: string;
    regularSeasonEndDate: string;
    seasonEndDate: string;
    numberOfGames: number;
    tiesInUse: boolean;
    olympicsParticipation: boolean;
    conferencesInUse: boolean;
    divisionsInUse: boolean;
    wildCardInUse: boolean;
}

export interface NhlApiPlayerStat {
    assists: number;
    faceoffWinPctg: number;
    gameWinningGoals: number;
    gamesPlayed: number;
    goals: number;
    otGoals: number;
    penaltyMinutes: number;
    playerBirthCity: string;
    playerBirthCountry: string;
    playerBirthDate: string;
    playerBirthStateProvince: string;
    playerDraftOverallPickNo: number;
    playerDraftRoundNo: number;
    playerDraftYear: number;
    playerFirstName: string;
    playerHeight: number;
    playerId: number;
    playerInHockeyHof: number;
    playerIsActive: number;
    playerLastName: string;
    playerName: string;
    playerNationality: string;
    playerPositionCode: string;
    playerShootsCatches: string;
    playerWeight: number;
    plusMinus: number;
    points: number;
    pointsPerGame: number;
    ppGoals: number;
    ppPoints: number;
    shGoals: number;
    shPoints: number;
    shiftsPerGame: number;
    shootingPctg: number;
    shots: number;
    timeOnIcePerGame: number;
}
