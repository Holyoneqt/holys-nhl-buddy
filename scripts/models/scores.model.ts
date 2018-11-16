declare module ScoresModel {

    interface MappedGames {
        teamName: string;
        finishedGames: NhlApi.Schedule.Game[],
        home: {
            played: number,
            won: number,
            winPercent: number,
            avgGoals: number,
        },
        away: {
            played: number,
            won: number,
            winPercent: number,
            avgGoals: number,
        },
    }

    interface RivalryGame {
        away:{
            teamId: number,
            score: number
        },
        home:{
            teamId: number,
            score: number
        }
    }

}