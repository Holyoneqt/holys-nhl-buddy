var date = new Date();
date.setTime(new Date().getTime() - (1000 * 60 * 60 * 24));
var games = [];

window.onload = () => {
    displayDate(date.toLocaleDateString());

    document.getElementById('prev').onclick = () => {
        date.setTime(date.getTime() - (1000 * 60 * 60 * 24));
        displayDate(date.toLocaleDateString());
        getScoresOfDay(date);
    };

    document.getElementById('next').onclick = () => {
        date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
        displayDate(date.toLocaleDateString());
        getScoresOfDay(date);
    };

    getScoresOfDay(date);

};

function getScoresOfDay(date) {
    getScores(getFormatedDate(date), getFormatedDate(date))
        .then(j => games = j.dates[0].games)
        .then(() => displayGames(games));
}

function displayGames(gameList) {
    var gamesList = document.getElementById('games');
    gamesList.innerHTML = '';
    gameList.forEach(g => {
        var li = document.createElement('li');
        li.style.height = '60px';
        li.style.padding = '20px 16px';
        console.log(g);
        var home = g.teams.home;
        var away = g.teams.away;

        var text = document.createElement('span');
        text.innerHTML = `${away.score} : ${home.score}`;
        text.style.margin = 'auto 8px';
        
        const imgHome = document.createElement('img');
        imgHome.src = `./images/${home.team.id}.gif`;
        imgHome.classList.add([ 'w3-bar-item' ]);
        imgHome.style.width = '40px';
        imgHome.style.height = '25px';

        const imgAway = document.createElement('img');
        imgAway.src = `./images/${away.team.id}.gif`;
        imgAway.classList.add([ 'w3-bar-item' ]);
        imgAway.style.width = '40px';
        imgAway.style.height = '25px';

        li.appendChild(imgAway);
        li.appendChild(text);
        li.appendChild(imgHome);
        gamesList.appendChild(li);
    });
}

function displayDate(date) {
    document.getElementById('date').innerHTML = date;
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