export class GameArrayHelper {

    private initialGames: NhlApi.Schedule.Game[];
    private selectedGames: NhlApi.Schedule.Game[];

    constructor(games: NhlApi.Schedule.Date[]) {
        this.initialGames = games.map(date => date.games[0]);
        this.selectedGames = [...this.initialGames];
    }

    public select(): NhlApi.Schedule.Game[] {
        const returnVal = [...this.selectedGames];
        this.selectedGames = [...this.initialGames];
        return returnVal;
    }

    public all(): GameArrayHelper {
        this.selectedGames = [...this.initialGames];
        return this;
    }

    public final(): GameArrayHelper {
        this.selectedGames = this.selectedGames.filter(g => g.status.detailedState === 'Final');
        return this;
    }

    public ofPastDays(numDays: number): GameArrayHelper {
        const queryDate = new Date(new Date().setTime(new Date().getTime() - (1000 * 60 * 60 * 24 * numDays)));
        this.selectedGames = this.selectedGames.filter(game => new Date((game.gameDate)).getTime() > queryDate.getTime())
        return this;
    }

    public last(num: number): GameArrayHelper {
        this.selectedGames = this.selectedGames.splice(-num);
        return this;
    }

    public allGamesOfTeam(teamId: number): GameArrayHelper {
        this.selectedGames = this.selectedGames.filter(g => g.teams.away.team.id === teamId || g.teams.home.team.id === teamId);
        return this;
    }

    public homeGamesOfTeam(teamId: number): GameArrayHelper {
        this.selectedGames = this.selectedGames.filter(g => g.teams.home.team.id === teamId);
        return this;
    }

    public awayGamesOfTeam(teamId: number): GameArrayHelper {
        this.selectedGames = this.selectedGames.filter(g => g.teams.away.team.id === teamId);
        return this;
    }

}