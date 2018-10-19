let divisionStandings = [];

window.onload = () => {
    getStandings()
        .then(json => divisionStandings = json.records)
        .then(() => displayStandings(divisionStandings));
};

function displayStandings(standings) {
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
            listItem.classList.add('standings-item');

            listItem.onclick = () => {
                window.location.href = `./team.html?id=${t.team.id}`;
            }
            
            const img = document.createElement('img');
            img.src = `./images/${t.team.id}.gif`;
            img.classList.add([ 'w3-bar-item' ]);
            img.style.width = '80px';
            img.style.height = '50px';
            img.style.cssFloat = 'left';

            const teamName = document.createElement('div');
            teamName.classList.add('w3-bar-item');
            teamName.innerHTML = `${t.divisionRank}. - ${t.team.name}`;

            const record = document.createElement('div');
            record.classList.add('w3-bar-item');
            record.style.cssFloat = 'right';
            record.innerHTML = `${t.leagueRecord.wins}-${t.leagueRecord.losses}-${t.leagueRecord.ot}`;


            listItem.appendChild(img);
            listItem.appendChild(teamName);
            listItem.appendChild(record);
            list.appendChild(listItem);
        });

        divisionContainer.appendChild(title);
        divisionContainer.appendChild(list);
    }
}