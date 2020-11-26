const URL = 'http://localhost:8081';
const authHeader = localStorage.getItem('auth');
const username = localStorage.getItem('username');
let entries = [];

const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};

const generateEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    entry['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    entry['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));

    fetch(`${URL}/users/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': authHeader
        }
    }).then((result) => {
        result.json().then((user) => {
            entry['user'] = {'id': user.id};
            fetch(`${URL}/entries`, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entry)
            }).then((result) => {
                result.json().then((entry) => {
                    entries.push(entry);
                    renderEntries();
                });
            });
        })
    })
};

const getUser = () => {
    fetch(`${URL}/users/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': authHeader
        }
    }).then((result) => {
        result.json().then((user) => {
            return user;
        })
    })
}

const deleteEntry = (entryId) => {
    entries = [];
    fetch(`${URL}/entries/${entryId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': authHeader,
        }
    }).then((result) => {
        if (result.status !== 204) {
            alert('Es besteht ein Fehler beim löschen des Eintrages.');
        }
        indexEntries();
    });
};

const indexEntries = () => {
    fetch(`${URL}/entries`, {
        method: 'GET',
        headers: {
            'Authorization': authHeader,
        }
    }).then((result) => {
        result.json().then((result) => {
            entries = result;
            renderEntries();
        });
    });
    renderEntries();
};

document.addEventListener('DOMContentLoaded', function(){
    const createEntryForm = document.querySelector('#createEntryForm');
    createEntryForm.addEventListener('submit', generateEntry);
    indexEntries();
});

const renderEntries = () => {
    const display = document.querySelector('#display');
    display.innerHTML = '';
    entries.forEach((entry) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(entry.id));
        row.appendChild(createCell(new Date(entry.checkIn).toLocaleString()));
        row.appendChild(createCell(new Date(entry.checkOut).toLocaleString()));
        row.appendChild(createButton(entry.id, 'Löschen', deleteEntry));
        display.appendChild(row);
    });
};
