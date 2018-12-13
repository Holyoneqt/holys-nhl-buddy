export interface TodaysGameModel {
    time: string;
    away: Team;
    home: Team;
}

interface Team {
    name: string;
    record: string;
}