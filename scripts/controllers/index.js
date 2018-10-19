var date = new Date();
date.setTime(new Date().getTime() - (1000 * 60 * 60 * 24));
var condensedGames = [];

window.onload = () => {
    displayDate(date.toLocaleDateString());

    document.getElementById('prev').onclick = () => {
        date.setTime(date.getTime() - (1000 * 60 * 60 * 24));
        displayDate(date.toLocaleDateString());
        let gamesOfDay = condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date)));
        displayGames(gamesOfDay);
    };

    document.getElementById('next').onclick = () => {
        date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
        displayDate(date.toLocaleDateString());
        let gamesOfDay = condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date)));
        displayGames(gamesOfDay);
    };

    getAllVideos()
        .then(json => json.items.filter(i => i.snippet.title.includes('Condensed Game')))
        .then(filtered => condensedGames = filtered)
        .then(() => displayGames(condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date)))));
};

function displayGames(gameList) {
    var gamesList = document.getElementById('games');
    gamesList.innerHTML = '';
    gameList.forEach(g => {
        var li = document.createElement('li');

        var img = document.createElement('img');
        img.src = g.snippet.thumbnails.high.url;
        img.style.width = '160px';
        img.style.height = '90px';
        img.style.marginRight = '5px';

        var a = document.createElement('a');
        a.innerHTML = g.snippet.title;
        a.href = `https://www.youtube.com/watch?v=${g.id.videoId}`;
        a.style.fontSize = '24px';

        li.appendChild(img);
        li.appendChild(a);
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
    var year = date.getUTCFullYear() - 2000;

    return `${month}/${day}/${year}`;
}