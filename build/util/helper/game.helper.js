"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameArrayHelper {
    constructor(games) {
        this.initialGames = [];
        games.forEach(date => {
            date.games.forEach(game => this.initialGames.push(game));
        });
        this.selectedGames = [...this.initialGames];
    }
    select() {
        const returnVal = [...this.selectedGames];
        this.selectedGames = [...this.initialGames];
        return returnVal;
    }
    all() {
        this.selectedGames = [...this.initialGames];
        return this;
    }
    final() {
        this.selectedGames = this.selectedGames.filter(g => g.status.detailedState === 'Final');
        return this;
    }
    ofPastDays(numDays) {
        const queryDate = new Date(new Date().setTime(new Date().getTime() - (1000 * 60 * 60 * 24 * numDays)));
        this.selectedGames = this.selectedGames.filter(game => new Date((game.gameDate)).getTime() > queryDate.getTime());
        return this;
    }
    last(num) {
        this.selectedGames = this.selectedGames.splice(-num);
        return this;
    }
    allGamesOfTeam(teamId) {
        this.selectedGames = this.selectedGames.filter(g => g.teams.away.team.id === teamId || g.teams.home.team.id === teamId);
        return this;
    }
    homeGamesOfTeam(teamId) {
        this.selectedGames = this.selectedGames.filter(g => g.teams.home.team.id === teamId);
        return this;
    }
    awayGamesOfTeam(teamId) {
        this.selectedGames = this.selectedGames.filter(g => g.teams.away.team.id === teamId);
        return this;
    }
}
exports.GameArrayHelper = GameArrayHelper;
