export function teamHasWonGame(teamId: number, game: any): boolean {
    if (game.teams.away.team.id === teamId) {
        return (game.teams.away.score > game.teams.home.score)
    } else {
        return (game.teams.away.score < game.teams.home.score);
    }
}

export function getNhlApiDate(date: Date) {
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = '0' + month;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
        day = '0' + day;
    }
    const year = date.getUTCFullYear();

    return `${year}-${month}-${day}`;
}