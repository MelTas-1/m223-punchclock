const URL = 'http://localhost:8081';
let login = true;

const loginRegisterUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    userData['username'] = formData.get('username');
    userData['password'] = formData.get('password');
    if (userData['username'] === "" || userData['password'] === "") {
        return alert('Die Felder müssen befüllt werden');
    }

    document.addEventListener('DOMContentLoaded', function () {
        const logForm = document.getElementById('logForm');
        logForm.addEventListener('submit', loginRegisterUser);
    });

    if (login) {
        fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((result) => {
            if (result.status !== 200) {
                return alert('Passwort/Benutzername inkorrekt')
            }
            let authHeader = result.headers.get('Authorization');
            localStorage.setItem('auth', authHeader);
            localStorage.setItem('username', userData['username']);
        });
        window.location.href = `${URL}/items.html`;

    } else {
        if (userData['password'] !== formData.get('changepw')) {
            return alert('Die Passwörter stimmen nicht überein.');
        }
        fetch(`${URL}/users/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((result) => {
            if (result.status !== 202) {
                alert('Der Benutzer konnte nicht erstellt werden.');
            } else {
                swap();
                alert('Der Benutzer wurde erfolgreich erstellt.')
            }
        });

    }

};
