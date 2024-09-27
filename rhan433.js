
// Splitting each section into a navigational tab
let currentTab = "";
function showTabHome() {
    if (currentTab != "HomeTab") {
        currentTab = "HomeTab";
        showNoTabs();
        document.getElementById("HomeTab").style.backgroundColor = "lightgrey";
        document.getElementById("home-content").style.display = "inline";
    }
}

function showTabNZSL() {
    if (currentTab != "NZSLTab") {
        currentTab = "NZSLTab";
        showNoTabs();
        document.getElementById("NZSLTab").style.backgroundColor = "lightgrey";
        document.getElementById("nzsl-content").style.display = "inline";
    }
}

function showTabEvents() {
    if (currentTab != "EventsTab") {
        currentTab = "EventsTab";
        showNoTabs();
        document.getElementById("EventsTab").style.backgroundColor = "lightgrey";
        document.getElementById("events-content").style.display = "inline";
    }
}

function showTabGuestBook() {
    if (currentTab != "GuestBookTab") {
        currentTab = "GuestBookTab";
        showNoTabs();
        document.getElementById("GuestBookTab").style.backgroundColor = "lightgrey";
        document.getElementById("guest-book-content").style.display = "inline";
    }
}

function showNoTabs() {
    document.getElementById("HomeTab").style.backgroundColor = "transparent";
    document.getElementById("NZSLTab").style.backgroundColor = "transparent";
    document.getElementById("EventsTab").style.backgroundColor = "transparent";
    document.getElementById("GuestBookTab").style.backgroundColor = "transparent";

    document.getElementById("home-content").style.display = "none";
    document.getElementById("nzsl-content").style.display = "none";
    document.getElementById("events-content").style.display = "none";
    document.getElementById("guest-book-content").style.display = "none";
}

window.onload = function () {
    showTabNZSL();
}

// GetVersion API
async function GetVersion() {
    const url = "https://cws.auckland.ac.nz/nzsl/api/Version";

    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        const footerText = document.querySelector('footer p');
        footerText.textContent = `Version ${data}`;
    } catch (error) {
        console.error('Failed to fetch version:', error);
    }
}



// // Allsigns static API
// const allSignsList = '[{ "id": "black-3201", "description": "black, pango" }, { "id": "blue-478", "description": "blue, kikorangi, kahurangi" }, { "id": "bold-5562", "description": "bold, boldface, stand out, miramira" }, { "id": "bullet_point-5545", "description": "bullet point, tohumatā" }, { "id": "calculator-2402", "description": "calculator, calculate, tātaitai" }, { "id": "click_computer_mouse_button-5750", "description": "click, mouse button, pāwhiria" }, { "id": "colour-1539", "description": "colour, tae, kano" }, { "id": "computer-1659", "description": "computer, compute, rorohiko" }, { "id": "computer_screen-5812", "description": "computer screen, screen, monitor, computer monitor, mata rorohiko" }, { "id": "delete-4799", "description": "delete, wipe out, destroy, ukui, muku" }, { "id": "disconnect-5563", "description": "disconnect, lose contact, whakaweto" }, { "id": "download-5347", "description": "download, tuku mai, hīrau mai" }, { "id": "google-6185", "description": "Google, Kūkara" }, { "id": "green-927", "description": "green, kākāriki" }, { "id": "hard_drive-5355", "description": "hard drive, puku rorohiko" }, { "id": "italic-5567", "description": "italics, tītaha te tuhi, tuhi tītaha" }, { "id": "laptop-5511", "description": "laptop, rorohiko pōnaho" }, { "id": "online-7162", "description": "online, tuihono" }, { "id": "programme-2948", "description": "computer program, hōtaka" }, { "id": "red-2201", "description": "red, whero" }, { "id": "software-5373", "description": "software, pūmanawa rorohiko" }, { "id": "upload-8211", "description": "upload, tuku atu" }, { "id": "white-3020", "description": "white, mā" }, { "id": "yellow-2987", "description": "yellow, kōwhai" }]';
// const allSignsParsed = JSON.parse(allSignsList);

// const nzslContent = document.getElementById('nzsl-container');

// allSignsParsed.forEach(sign => {
//     const signContainer = document.createElement('div');
//     signContainer.id = `signs`;
//     signContainer.classList.add('sign');

//     const signId = document.createElement('img');
//     signId.src = `https://cws.auckland.ac.nz/nzsl/api/SignImage/${sign.id}`;
//     signId.alt = sign.id;

//     signId.textContent = sign.id;
//     const signDescription = document.createElement('p');
//     signDescription.textContent = sign.description;
//     signContainer.append(signId);
//     signContainer.append(signDescription);

//     nzslContent.append(signContainer);
// });


// RemoteData implementation of AllSigns API

document.addEventListener('DOMContentLoaded', function () {
    Allsigns();
    document.getElementById('search-input').addEventListener('input', function () {
        const user_input = this.value.trim();
        if (user_input) {
            searchItems(`https://cws.auckland.ac.nz/nzsl/api/Signs/${user_input}`);
        } else {
            Allsigns();
        }
    });
});
function Allsigns() {
    fetch('https://cws.auckland.ac.nz/nzsl/api/AllSigns')
        .then((response) => response.json())
        .then(data => {
            const nzslContent = document.getElementById("nzsl-container");
            nzslContent.innerHTML = "";
            data.forEach(sign => {
                const signContainer = document.createElement('div');
                signContainer.classList.add('nzsl-card');

                const signId = document.createElement('img');
                signId.src = `https://cws.auckland.ac.nz/nzsl/api/SignImage/${sign.id}`;
                signId.alt = sign.description;
                signId.classList.add('sign-image');
                signId.width = 100;
                signId.height = 100;

                const signDescription = document.createElement('p');
                signDescription.textContent = sign.description;

                signContainer.append(signId);
                signContainer.append(signDescription);
                nzslContent.append(signContainer);
            });
        })
        .catch(error => console.log(error));
}


function searchItems(item) {
    fetch(item)
        .then(response => response.json())
        .then(results => {
            const items = document.getElementById("nzsl-container");
            items.innerHTML = "";
            results.forEach(item => {
                const signContainer = document.createElement('div');
                signContainer.classList.add('nzsl-card');

                const signId = document.createElement('img');
                signId.src = `https://cws.auckland.ac.nz/nzsl/api/SignImage/${item.id}`;
                signId.alt = item.description;
                signId.width = 100;
                signId.height = 100;

                const signDescription = document.createElement('p');
                signDescription.textContent = item.description;
                signContainer.append(signId);
                signContainer.append(signDescription);

                items.append(signContainer);
            });
            console.log(results);
        })
        .catch(error => console.log(error));
};


//Events API

async function getEventCount() {
    try {
        const response = await fetch("https://cws.auckland.ac.nz/nzsl/api/EventCount");
        const eventCount = await response.text();
        const count = parseInt(eventCount);
        for (let i = 0; i < count; i++) {
            fetchEvent(i);
        }
    } catch (error) {
        console.error('Failed to fetch event count', error);
    }
}

async function fetchEvent(id) {
    try {
        const response = await fetch(`https://cws.auckland.ac.nz/nzsl/api/Event/${id}`);
        const eventData = await response.text();
        console.log(eventData);
        const events = parseIcal(eventData);

        events.forEach(event => {
            const eventContainer = document.createElement('div');
            eventContainer.classList.add('event');

            const eventSummary = document.createElement('h3');
            eventSummary.textContent = event.SUMMARY;

            const eventDescription = document.createElement('p');
            eventDescription.textContent = event.DESCRIPTION;

            const eventLocation = document.createElement('p');
            eventLocation.textContent = `Location: ${event.LOCATION}`;

            const eventStartDate = document.createElement('p');
            const parsedStartDate = parseEventDate(event.DTSTART);
            eventStartDate.textContent = `Starts: ${parsedStartDate.toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}`;

            const eventEndDate = document.createElement('p');
            const parsedEndDate = parseEventDate(event.DTEND);
            eventEndDate.textContent = `Ends: ${parsedEndDate.toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}`;



            eventContainer.append(eventSummary, eventDescription, eventLocation, eventStartDate, eventEndDate);
            document.getElementById('eventsList').appendChild(eventContainer);
        });
    } catch (error) {
        console.error('Failed to fetch event data by given id', error);
    }
}

function parseEventDate(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(9, 11);
    const minute = dateString.substring(11, 13);
    const second = dateString.substring(13, 15);

    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}


function parseIcal(icalString) {
    const events = [];
    const lines = icalString.split('\n');
    let event = {};

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('BEGIN:VEVENT')) {
            event = {};
        } else if (line.startsWith('END:VEVENT')) {
            events.push(event);
            event = {};
        } else if (line.includes(':')) {
            const [key, value] = line.split(':');
            event[key] = value;
        }
    });
    console.log(events);

    return events;
}


//Set font color of comments iframe

const iframe = document.getElementById('comments-iframe');
iframe.onload = function () {
    iframe.contentWindow.postMessage('set-font-color', 'aqua'); // send message to iframe
};

getEventCount();
GetVersion();
Allsigns();