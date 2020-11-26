const URL = 'http://localhost:8081';
let users = [];
const authHeader = localStorage.getItem('auth');
const username = localStorage.getItem('username');

const createUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    userData['username'] = formData.get('username');
    userData['password'] = formData.get('password');
    if (userData['username'] === "" || userData['password'] === "") {
        return alert('Es sollen alle Felder befüllt sein');
    }
    if (userData['password'] !== formData.get('repw')) {
        return alert('Die Passwörter stimmen nicht überein.');
    }

    fetch(`${URL}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then((result) => {
        result.json().then((userData) => {
            users.push(userData);
            renderUsers();
        });
    });
};



const deleteUser = (userId) => {
    users = [];
    fetch(`${URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': authHeader,
        }
    }).then((result) => {
        if (result.status !== 204) {
            alert('löschen fehlgeschlagen.');
        }
        indexUsers();
    });
};

const indexUsers = () => {
    fetch(`${URL}/users`, {
        method: 'GET',
        headers: {
            'Authorization': authHeader,
        }
    }).then((result) => {
        result.json().then((result) => {
            users = result;
            renderUsers();
        });
    });
    renderUsers();
};

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};
document.addEventListener('DOMContentLoaded', function(){
    const createUserForm = document.querySelector('#userCreat');
    createUserForm.addEventListener('submit', createUser);
    indexUsers();
});
const createButton = (entryId, text, buttonFunction) => {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    button.innerText = text;
    button.onclick = function () {
        console.log(entryId);
        buttonFunction(entryId);
    };
    cell.appendChild(button);
    return cell;
};

const renderUsers = () => {
    const display = document.querySelector('#display');
    display.innerHTML = '';
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(user.id));
        row.appendChild(createCell(user.username));
        row.appendChild(createButton(user.id, 'Löschen', deleteUser));
        display.appendChild(row);
    });
};
