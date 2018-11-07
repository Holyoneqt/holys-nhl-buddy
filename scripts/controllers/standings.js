let divisionStandings = [];
let leagueStandings = [];

window.onload = () => {
    getStandings()
        .then(json => divisionStandings = json.records)
        .then(() => displayStandings(divisionStandings))
        .then(() => leagueStandings = [ ...divisionStandings[0].teamRecords, ...divisionStandings[1].teamRecords, ...divisionStandings[2].teamRecords, ...divisionStandings[3].teamRecords ])
        .then(() => leagueStandings.sort((a, b) => a.leagueRank - b.leagueRank))
        .then(() => console.log(leagueStandings));
};

function displayStandings(standings) {
    console.log(standings);
    for(let i = 0; i < standings.length; i++) {
        const divisionContainer = document.getElementById(`division-${i}`);
        const d = standings[i];

        const title = document.createElement('h3');
        title.innerHTML = d.division.name;
        title.classList.add('w3-center');

        const list = document.createElement('ul');
        list.classList.add('w3-ul');
        d.teamRecords.forEach(t => {
            const listItem = document.createElement('li');
            listItem.classList.add('w3-bar');
            listItem.classList.add('hoverable-item');
            listItem.style.fontSize = '12px';
            listItem.style.background = localStorage.getItem('fav-team') == t.team.id ? 'lightgreen' : '';

            listItem.onclick = () => {
                window.location.href = `./team.html?id=${t.team.id}`;
            }
            
            const img = document.createElement('img');
            img.src = `./images/${t.team.id}.gif`;
            img.classList.add([ 'w3-bar-item' ]);
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.cssFloat = 'left';
            img.style.padding = '8px 2px';

            const teamName = document.createElement('div');
            teamName.classList.add('w3-bar-item');
            let wildCard = '';
            if (t.wildCardRank === '1') { wildCard = '(WC1)'; }
            else if (t.wildCardRank === '2') { wildCard = '(WC2)'; }
            teamName.innerHTML = `${t.divisionRank}. - ${t.team.name} ${wildCard}`;

            const record = document.createElement('div');
            record.classList.add('w3-bar-item');
            record.style.cssFloat = 'right';
            record.innerHTML = `${t.leagueRecord.wins}-${t.leagueRecord.losses}-${t.leagueRecord.ot} (${t.streak.streakCode})`;

            const plusMinusNumber = t.goalsScored - t.goalsAgainst;
            const plusMinus = document.createElement('div');
            plusMinus.classList.add('w3-bar-item');
            plusMinus.style.cssFloat = 'right';
            plusMinus.style.color = plusMinusNumber < 0 ? 'red' : 'green';
            plusMinus.innerHTML = plusMinusNumber < 0 ? plusMinusNumber.toString() : `+${plusMinusNumber}`;

            listItem.appendChild(img);
            listItem.appendChild(teamName);
            listItem.appendChild(record);
            listItem.appendChild(plusMinus);
            list.appendChild(listItem);
        });

        divisionContainer.appendChild(title);
        divisionContainer.appendChild(list);
    }
}