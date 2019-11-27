"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function teamHasWonGame(teamId, game) {
    if (game.teams.away.team.id === teamId) {
        return (game.teams.away.score > game.teams.home.score);
    }
    else {
        return (game.teams.away.score < game.teams.home.score);
    }
}
exports.teamHasWonGame = teamHasWonGame;
function getNhlApiDate(date) {
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
exports.getNhlApiDate = getNhlApiDate;
