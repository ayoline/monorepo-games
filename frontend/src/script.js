const apiUrl = 'http://localhost:3000'

loadTableOrderById();

const btnAddGame = document.querySelector('#btn-add-game');
btnAddGame.onclick = function () { showForms('add') };

const inputAddGame = document.querySelector('#add-game-input');
const inputAddYear = document.querySelector('#add-year-input');
const inputAddGenre = document.querySelector('#add-genre-input');
const inputAddMultiplayer = document.querySelector('#add-multiplayer-input');
const inputAddOffline = document.querySelector('#add-offline-input');
const inputAddCrossplataform = document.querySelector('#add-crossplataform-input');
const bgPage = document.querySelector('#table-box');

const btnAddConfirm = document.querySelector('#btn-add-confirm')
btnAddConfirm.onclick = function () {
    if (inputAddGame.value && inputAddYear.value && inputAddGenre.value) {
        saveNewGame();
    } else {
        alert('Please fill in all fields!');
    }
}
const btnCloseAddForms = document.querySelector('#btn-in-close-add-forms');
btnCloseAddForms.innerHTML = "X";
btnCloseAddForms.onclick = function () { closeForms('add') }

const addGameForms = document.querySelector('#add-game-forms');

const inputUpdateId = document.querySelector('#update-id-input');
const inputUpdateGame = document.querySelector('#update-game-input');
const inputUpdateYear = document.querySelector('#update-year-input');
const inputUpdateGenre = document.querySelector('#update-genre-input');
const inputUpdateMultiplayer = document.querySelector('#update-multiplayer-input');
const inputUpdateOffline = document.querySelector('#update-offline-input');
const inputUpdateCrossplataform = document.querySelector('#update-crossplataform-input');

const btnCloseUpdateForms = document.querySelector('#btn-in-close-update-forms');
btnCloseUpdateForms.innerHTML = "X";
btnCloseUpdateForms.onclick = function () { closeForms('update') }

const updateGameForms = document.querySelector('#update-game-forms');

function saveNewGame() {
    const element = {};

    element.game = inputAddGame.value;
    element.year = inputAddYear.value;
    element.genre = inputAddGenre.value;
    element.multiplayer = inputAddMultiplayer.checked;
    element.offline = inputAddOffline.checked;
    element.crossplataform = inputAddCrossplataform.checked;

    saveGameOnServer(element);
}

function saveGameOnServer(_element) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(_element)
    };

    fetch(apiUrl + '/save/savedata', requestOptions).then(resp => resp.text()).then(el => {
        el = JSON.parse(el);
        console.log(el);
        if (!el.error) {
            const addedGame = [];

            closeForms('add');
            addedGame.push(el)
            loadFilteredTable(addedGame);
        } else {
            console.log(el.error);
        }
    });
}

function loadTableOrderById() {
    fetch(apiUrl + `/order/order?value=${'order'}`).then(resp => resp.text()).then(element => {
        element = JSON.parse(element);

        loadFilteredTable(element);
    });
}

function editGameById(_gameToBeUpdated) {
    const id = _gameToBeUpdated;

    fetch(apiUrl + `/order/order?value=${id}`).then(resp => resp.text()).then(element => {
        element = JSON.parse(element);
        const el = element[0];
        showForms('update');

        inputUpdateId.value = el.id;
        inputUpdateId.disabled = true;
        inputUpdateGame.value = el.game;
        inputUpdateYear.value = el.year;
        inputUpdateGenre.value = el.genre;
        inputUpdateMultiplayer.checked = el.multiplayer;
        inputUpdateOffline.checked = el.offline;
        inputUpdateCrossplataform.checked = el.crossplataform;
    });
}

const btnUpdateConfirm = document.querySelector('#btn-update-confirm');
btnUpdateConfirm.onclick = function () {
    if (inputUpdateGame.value && inputUpdateYear.value && inputUpdateGenre.value) {
        const gameToBeUpdated =
        {
            'id': inputUpdateId.value,
            'game': inputUpdateGame.value,
            'year': inputUpdateYear.value,
            'genre': inputUpdateGenre.value,
            'multiplayer': inputUpdateMultiplayer.checked,
            'offline': inputUpdateOffline.checked,
            'crossplataform': inputUpdateCrossplataform.checked
        };
        updateGameOnServer(gameToBeUpdated);
    } else {
        alert('Please fill in all fields!');
    }
}

function updateGameOnServer(_gameToBeUpdated) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(_gameToBeUpdated)
    };

    fetch(apiUrl + '/update/updatedata', requestOptions).then(resp => resp.text()).then(el => {
        el = JSON.parse(el);
        if (!el.error) {
            alert(`Game ID ${el} has been Updated!`);
            closeForms('update');
            loadTableOrderById();
        } else {
            console.log(el.error);
        }
    });
}

function deleteGameById(_gameToBeDeleted) {
    const id = _gameToBeDeleted;

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    };

    fetch(apiUrl + '/delete/deletedata', requestOptions).then(resp => resp.text()).then(el => {
        el = JSON.parse(el);
        if (!el.error) {
            alert(`Game ${el.game} has been deleted!`);
            loadTableOrderById();
        } else {
            console.log(el.error);
        }
    });
}

function loadFilteredTable(_element) {
    loadFirstLineTable();

    if (!_element.error) {
        for (let i = 0; i < _element.length; i++) {
            const el = _element[i];
            let multiplayer = el.multiplayer ? "Sim" : "Não";
            let offline = el.offline ? "Sim" : "Não";
            let crossplataform = el.crossplataform ? "Sim" : "Não";

            document.querySelector("#table").innerHTML += `
            <tr>
                <td>${el.id}</td>
                <td>${el.game}</td>
                <td>${el.year}</td>
                <td>${el.genre}</td>
                <td>${multiplayer}</td>
                <td>${offline}</td>
                <td>${crossplataform}</td>
                <td><input style="color: rgb(146, 146, 21); font-weight: bold;" type="button" value="Edit" onclick="editGameById(${el.id})"></td>
                <td><input style="color: rgb(212, 16, 16); font-weight: bold;" type="button" value="X" onclick="deleteGameById(${el.id})"></td>
            </tr>
            `;
        }
    } else {
        errorMsg(_element.msg);
    }
}

function loadFirstLineTable() {
    document.querySelector("#table").innerHTML = `
    <tr>
        <th>Id</th>
        <th>Game</th>
        <th>Year</th>
        <th>Genre</th>
        <th>Multiplayer</th>
        <th>Offline</th>
        <th>Crossplataform</th>
    </tr>
    `;
}

function errorMsg(_str) {
    document.querySelector("#table").innerHTML += `
    <tr>
        <td>${_str}</td>
        <td></td>
        <td></td>
    </tr>
    `;
}

function showForms(_addOrUpdateUser) {
    bgPage.style.filter = 'blur(8px)';
    if (_addOrUpdateUser === 'add') {
        addGameForms.style.display = "block";
        addGameForms.style.visibility = "visible";
        addGameForms.style.opacity = "1";
    } else if (_addOrUpdateUser === 'update') {
        updateGameForms.style.display = "block";
        updateGameForms.style.visibility = "visible";
        updateGameForms.style.opacity = "1";
    }
}

function closeForms(_addOrUpdateUser) {
    bgPage.style.filter = '';
    if (_addOrUpdateUser === 'add') {
        addGameForms.style.visibility = "hidden";
        addGameForms.style.opacity = "0";
    } else if (_addOrUpdateUser === 'update') {
        updateGameForms.style.visibility = "hidden";
        updateGameForms.style.opacity = "0";
    }
}