export function teamHasWonGame(teamId: number, game: NhlApi.Schedule.Game): boolean {
    if (game.teams.away.team.id === teamId) {
        return (game.teams.away.score > game.teams.home.score)
    } else {
        return (game.teams.away.score < game.teams.home.score);
    }
}