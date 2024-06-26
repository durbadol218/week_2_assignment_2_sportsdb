const Players = (playerName) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
        .then(res => res.json())
        .then(data => {
            showPlayers(data,playerName);
        })
}
Players('a');

const showPlayers = (data,playerName) => {
    const playersContainer = document.getElementById("allPlayers");
    playersContainer.innerHTML = '';
    if (data.player) {
        data.player.forEach(player => {
            // console.log(player);
            const playerPhoto = player.strThumb;
            const playerName = player.strPlayer;
            const playerTeamName = player.strTeam;
            const playerNationality = player.strNationality;
            const playerFacebook = player.strFacebook;
            const playerInstagram = player.strInstagram;
            const playerTwitter = player.strTwitter;
            const playerPosition = player.strPosition;
            const sportType = player.strSport;
            const newDiv = document.createElement("div");
            newDiv.classList.add("col");
            newDiv.innerHTML = `
            <div class="card border rounded-3 border-black">
                <img src="${playerPhoto}" class="img-fluid rounded-3" />
                <div class="card-body">
                    <h3 class="player-name text-center">${playerName}</h3>
                    <div class="player-description">
                        <h5>Team: ${playerTeamName}</h5>
                        <p class="">Nationality: ${playerNationality}</p>
                        <p class="">Sport Type: ${sportType}</p>
                        <p class="">Position: ${playerPosition}</p>
                    </div>
                    <hr>
                    <div class="players-social d-flex justify-content-between align-items-center mb-1">
                        <div class="social-text">
                            <h5>Player's Social Handle: </h5>
                        </div>
                        <div class="social-icons">
                            <a href="${playerFacebook}" target="_blank"><i class="fa-brands fa-facebook" style="font-size:30px;"></i></a>
                            <a href="${playerInstagram}" target="_blank"><i class="fa-brands fa-x-twitter" style="font-size:30px;"></i></a>
                            <a href="${playerTwitter}" target="_blank"><i class="fa-brands fa-instagram" style="font-size:30px;"></i></a>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="showPlayerDetails('${player.idPlayer}')" class="btn btn-info w-50"  data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                        <button id="add-player-button-${player.idPlayer}" onclick="addToCart ('${player.strPlayer}', '${player.strSport}', '${player.strNationality}', '${player.strTeam}', 'add-player-button-${player.idPlayer}')" class="btn btn-success w-40">Add to XI!</button>
                    </div>
                </div>
        `;
            playersContainer.appendChild(newDiv);
        });
    } else {
        playersContainer.innerHTML = `<h4 class="text-danger text-center w-100">Sorry!!! No Players Found With this name ${playerName}.</h4>`;
    }
};


const showPlayerDetails = (playerID) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerID}`)
        .then(res => res.json())
        .then(data => {
            viewSinglePlayer(data.players[0]);
        })
}
// const showMealDetails = data => {
//     const meal=data.meals[0];
//     const mealPhoto = meal.strMealThumb;
//     const mealName = meal.strMeal;

//     const mealDetailsSection = document.getElementById('meal-details-section');
//     mealDetailsSection.innerHTML = `
//         <div id="meal-details" class="card border-0 shadow col-xm-12 col-sm-12 col-md-6" style="border-radius: 10px; width: 19.5rem;">
//                 <img src="${mealPhoto}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
//                 <div class="card-body">
//                     <h3 class="card-title text-center my-1">${mealName}</h3>
//                     <h5 class="card-title text-center text-success">Category: ${meal.strCategory} </h5>
//                     <hr>
//                     <p class="card-text">${meal.strInstructions.slice(0, 248)}</p>
//                     <div id="meal-ingredients"></div>
//                 </div>
//             </div>
//     `
//     const mealIngredients = document.getElementById('meal-ingredients');
// }

// For onclick() in the div section!
const getMealDetails = mealID => {
    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = ``;

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(response => response.json())
        .then(data => showMealDetails(data));
}

const viewSinglePlayer = (player) => {
    const playerPhoto = player.strThumb;
    const playerName = player.strPlayer;
    const playerTeamName = player.strTeam;
    const playerNationality = player.strNationality;
    const playerFacebook = player.strFacebook;
    const playerInstagram = player.strInstagram;
    const playerTwitter = player.strTwitter;
    const playerPosition = player.strPosition;
    const sportType = player.strSport;
    const modalTitle = document.getElementById("singlePlayerTitle");
    const modalBody = document.getElementById("singlePlayerbody");

    modalTitle.innerText = player.strPlayer;
    modalBody.innerHTML = `
        <div class="card">
        <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center">
                <img src=${player.strThumb} class="img-fluid rounded-2" alt="...">
            </div>

            <div class="col-md-8">
                <div class="card-body">
                    <p class="card-title text-info">Place of Birth: ${player.strBirthLocation} </p>
                    <p class="card-title text-info">Nationality: ${player.strNationality} </p>
                    <p class="card-title text-info">Sport Type: ${player.strSport} </p>
                    <p class="card-title text-info">Position: ${player.strPosition} </p>
                    <p class="text-black">${player.strDescriptionEN.slice(0, 180)}</p>
                    <p class="text-black">Gender: ${player.strGender}</p>
                </div>
            </div>
        </div>
    </div>`;
};

const PlayerNames = []; //for cart management
const addToCart = (name, sportType, nationality, team, buttonId) => {
    const container = document.getElementById("squad-players");
    if (PlayerNames.length < 11) {
        PlayerNames.push(name);
        document.querySelector('.player-number').innerText = PlayerNames.length;

        const newDiv = document.createElement("div");
        newDiv.className = 'd-flex flex-column align-items-left bg-success my-2 py-3 rounded-1';
        newDiv.style="border:2px solid white";
        newDiv.innerHTML = `
            <p class="fw-bold mb-1">Name: ${name}</ >
            <p class="small text-muted mb-1">Sport: ${sportType}</p>
            <p class="small text-muted mb-1">Nationality: ${nationality}</p>
            <p class="small text-muted mb-1">TeamName: ${team}</p>
`;
        container.appendChild(newDiv);

        const button = document.getElementById(buttonId);
        button.disabled = true;
        button.innerText = "Added!";
        button.classList.replace('btn-success', 'btn-warning');
    } else {
        alert("You can't add more than 11 players in your squad!");
    }
};

document.getElementById('player-submit').addEventListener('click', () => {
    const playerName = document.getElementById('player-input').value;
    if (playerName) {
        Players(playerName);
    }
    // else
    // {
    //     document.getElementById('Players').innerHTML = '';
    //     document.getElementById('playerNotFound').innerText = 'Please enter a player name!';
    // }
    document.getElementById('player-input').value = '';
});

// document.getElementById('player-input').addEventListener('input',(e) => {
//     const playerName = e.target.value;
//     if(playerName)
//         {
//             Players(playerName);
//             document.getElementById('playerNotFound').innerText = '';
//         }
//         else
//         {
//             document.getElementById('Players').innerHTML = '';
//             document.getElementById('playeNotFound').innerText = 'Please enter a valid pplayer name!'
//         }
// });
