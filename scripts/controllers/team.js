let teamId, team, schedule, roster;

window.onload = () => {
    const parameter = window.location.href.split('?')[1];
    if (parameter) {
        if (parameter.startsWith('id')) {
            teamId = parameter.substring(3);
            element('fav-star').style.color = isFavTeam() ? 'green' : 'black';
            getTeam(teamId)
                .then(j => team = j.teams[0])
                .then(() => displayTeamInfo(team))
                .then(() => getScheduleOfNext7Days(teamId))
                .then(j => schedule = j.dates)
                .then(() => displaySchedule(schedule, teamId))
                .then(() => getRoster(teamId))
                .then(j => roster = j.teams[0].roster.roster)
                .then(() => displayRoster(roster));
        }
    }

    element('fav-star').onclick = () => {
        if (isFavTeam()) {
            localStorage.removeItem('fav-team');
            element('fav-star').style.color = 'black';
        } else {
            localStorage.setItem('fav-team', teamId);
            element('fav-star').style.color = 'green';
        }
    };
};

function displayTeamInfo(t) {
    element('team-name').innerHTML = t.name;
    element('team-venue').innerHTML = `${t.venue.name} (${t.venue.city})`;
    element('team-logo').src = `./images/${t.id}.gif`;

    const stats = t.teamStats[0].splits[0].stat;
    element('stat-games').innerHTML = stats.gamesPlayed;
    element('stat-wins').innerHTML = stats.wins;
    element('stat-losses').innerHTML = stats.losses;
    element('stat-ot').innerHTML = stats.ot;
    element('stat-points').innerHTML = stats.pts;
}

function displaySchedule(s, teamId) {
    s.forEach(date => {
        date.games.forEach(g => {
            const li = document.createElement('li');
            if (g.teams.away.team.id == teamId) {
                li.innerHTML = `${new Date(g.gameDate).toLocaleDateString()} - @ ${g.teams.home.team.name} (${g.venue.name})`;
            } else {
                li.innerHTML = `${new Date(g.gameDate).toLocaleDateString()} - vs. ${g.teams.away.team.name} (${g.venue.name})`;
            }

            element('schedule').appendChild(li);
        });
    });
}

function displayRoster(r) {
    const gt = r.filter(player => player.position.type === 'Goalie');
    const def = r.filter(player => player.position.type === 'Defenseman');
    const fw = r.filter(player => player.position.type === 'Forward');

    gt.forEach(player => {
        const li = document.createElement('li');
        li.innerHTML = `#${player.jerseyNumber} - ${player.person.fullName}`;
        element('roster-gt').appendChild(li);
    });

    def.forEach(player => {
        const li = document.createElement('li');
        li.innerHTML = `#${player.jerseyNumber} - ${player.person.fullName}`;
        element('roster-def').appendChild(li);
    });

    fw.forEach(player => {
        const li = document.createElement('li');
        li.innerHTML = `#${player.jerseyNumber} - ${player.person.fullName}`;
        element('roster-fw').appendChild(li);
    });
}

function getScheduleOfNext7Days(id) {
    const d = new Date();
    const startDate = getFormatedDate(d);
    d.setTime(d.getTime() + (1000 * 60 * 60 * 24 * 10));
    const endDate = getFormatedDate(d);
    return getSchedule(id, startDate, endDate);
}

function element(id) {
    return document.getElementById(id);
}

function isFavTeam() {
    return localStorage.getItem('fav-team') === teamId;
}

function getFormatedDate(date) {
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
