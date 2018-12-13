export function teamHasWonGame(teamId: number, game: NhlApi.Schedule.Game): boolean {
    if (game.teams.away.team.id === teamId) {
        return (game.teams.away.score > game.teams.home.score)
    } else {
        return (game.teams.away.score < game.teams.home.score);
    }
}

export function getNhlApiDate(date: Date) {
    var month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = '0' + month;
    }
    var day = date.getDate().toString();
    if (day.length === 1) {
        day = '0' + day;
    }
    var year = date.getUTCFullYear();

    return `${year}-${month}-${day}`;
}