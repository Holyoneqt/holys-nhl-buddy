declare module NhlApi.Record {

    export interface League {
        id: number;
        name: string;
        link: string;
    }

    export interface Division {
        id: number;
        name: string;
        nameShort: string;
        link: string;
        abbreviation: string;
    }

    export interface Conference {
        id: number;
        name: string;
        link: string;
    }

    export interface Team {
        id: number;
        name: string;
        link: string;
    }

    export interface LeagueRecord {
        wins: number;
        losses: number;
        ot: number;
        type: string;
    }

    export interface Streak {
        streakType: string;
        streakNumber: number;
        streakCode: string;
    }

    export interface TeamRecord {
        team: Team;
        leagueRecord: LeagueRecord;
        goalsAgainst: number;
        goalsScored: number;
        points: number;
        divisionRank: string;
        conferenceRank: string;
        leagueRank: string;
        wildCardRank: string;
        row: number;
        gamesPlayed: number;
        streak: Streak;
        lastUpdated: Date;
    }

    export interface Record {
        standingsType: string;
        league: League;
        division: Division;
        conference: Conference;
        teamRecords: TeamRecord[];
    }

    export interface Response {
        copyright: string;
        records: Record[];
    }

}

declare module NhlApi.Team {

    export interface TimeZone {
        id: string;
        offset: number;
        tz: string;
    }

    export interface Venue {
        name: string;
        link: string;
        city: string;
        timeZone: TimeZone;
    }

    export interface Division {
        id: number;
        name: string;
        nameShort: string;
        link: string;
        abbreviation: string;
    }

    export interface Conference {
        id: number;
        name: string;
        link: string;
    }

    export interface Franchise {
        franchiseId: number;
        teamName: string;
        link: string;
    }

    export interface Type {
        displayName: string;
    }

    export interface Stat {
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

    export interface Team2 {
        id: number;
        name: string;
        link: string;
    }

    export interface Split {
        stat: Stat;
        team: Team2;
    }

    export interface TeamStat {
        type: Type;
        splits: Split[];
    }

    export interface Team {
        id: number;
        name: string;
        link: string;
        venue: Venue;
        abbreviation: string;
        teamName: string;
        locationName: string;
        firstYearOfPlay: string;
        division: Division;
        conference: Conference;
        franchise: Franchise;
        teamStats: TeamStat[];
        shortName: string;
        officialSiteUrl: string;
        franchiseId: number;
        active: boolean;
    }

    export interface Response {
        copyright: string;
        teams: Team[];
    }

}

declare module NhlApi.Schedule {

    export interface Status {
        abstractGameState: string;
        codedGameState: string;
        detailedState: string;
        statusCode: string;
        startTimeTBD: boolean;
    }

    export interface LeagueRecord {
        wins: number;
        losses: number;
        ot: number;
        type: string;
    }

    export interface Team {
        id: number;
        name: string;
        link: string;
    }

    export interface Away {
        leagueRecord: LeagueRecord;
        score: number;
        team: Team;
    }

    export interface LeagueRecord2 {
        wins: number;
        losses: number;
        ot: number;
        type: string;
    }

    export interface Team2 {
        id: number;
        name: string;
        link: string;
    }

    export interface Home {
        leagueRecord: LeagueRecord2;
        score: number;
        team: Team2;
    }

    export interface Teams {
        away: Away;
        home: Home;
    }

    export interface Venue {
        id: number;
        name: string;
        link: string;
    }

    export interface Content {
        link: string;
    }

    export interface Game {
        gamePk: number;
        link: string;
        gameType: string;
        season: string;
        gameDate: Date;
        status: Status;
        teams: Teams;
        venue: Venue;
        content: Content;
    }

    export interface Date {
        date: string;
        totalItems: number;
        totalEvents: number;
        totalGames: number;
        totalMatches: number;
        games: Game[];
        events: any[];
        matches: any[];
    }

    export interface Response {
        copyright: string;
        totalItems: number;
        totalEvents: number;
        totalGames: number;
        totalMatches: number;
        dates: Date[];
    }

}

declare module NhlApi.Roster {

    export interface TimeZone {
        id: string;
        offset: number;
        tz: string;
    }

    export interface Venue {
        name: string;
        link: string;
        city: string;
        timeZone: TimeZone;
    }

    export interface Division {
        id: number;
        name: string;
        nameShort: string;
        link: string;
        abbreviation: string;
    }

    export interface Conference {
        id: number;
        name: string;
        link: string;
    }

    export interface Franchise {
        franchiseId: number;
        teamName: string;
        link: string;
    }

    export interface Person {
        id: number;
        fullName: string;
        link: string;
    }

    export interface Position {
        code: string;
        name: string;
        type: string;
        abbreviation: string;
    }

    export interface Roster2 {
        person: Person;
        jerseyNumber: string;
        position: Position;
    }

    export interface Roster {
        roster: Roster2[];
        link: string;
    }

    export interface Team {
        id: number;
        name: string;
        link: string;
        venue: Venue;
        abbreviation: string;
        teamName: string;
        locationName: string;
        firstYearOfPlay: string;
        division: Division;
        conference: Conference;
        franchise: Franchise;
        roster: Roster;
        shortName: string;
        officialSiteUrl: string;
        franchiseId: number;
        active: boolean;
    }

    export interface Response {
        copyright: string;
        teams: Team[];
    }

}


