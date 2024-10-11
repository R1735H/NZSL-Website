let currentTab = "";

function showDailyTab() {
    if (currentTab != "daily") {
        currentTab = "daily";
        showNoTabs();
        document.getElementById("daily").style.backgroundColor = "lightgrey";
        document.getElementById("Daily-Case-Data").style.display = "block";
    }
}

function showInfoTab() {
    if (currentTab != "info") {
        currentTab = "info";
        showNoTabs();
        document.getElementById("info").style.backgroundColor = "lightgrey";
        document.getElementById("Infographics").style.display = "block";
    }
}

function showStatTab() {
    if (currentTab != "stat") {
        currentTab = "stat";
        showNoTabs();
        document.getElementById("stat").style.backgroundColor = "lightgrey";
        document.getElementById("Statistician").style.display = "block";
    }
}

function showNoTabs() {

    document.getElementById("daily").style.backgroundColor = "transparent";
    document.getElementById("info").style.backgroundColor = "transparent";
    document.getElementById("stat").style.backgroundColor = "transparent";

    document.getElementById("Daily-Case-Data").style.display = "none";
    document.getElementById("Infographics").style.display = "none";
    document.getElementById("Statistician").style.display = "none";
}

window.onload = function () {
    showDailyTab();
}





async function versionAPI() {
    const res = await fetch("https://cws.auckland.ac.nz/Qz2021JGC/api/Version");

    const data = await res.json();
    const footerText = document.querySelector("footer p");
    footerText.textContent = `Version ${data}`;

}


async function caseCounts() {
    const res = await fetch("https://cws.auckland.ac.nz/Qz2021JGC/api/CaseCounts", {
        headers: {
            "Accept": "application/json",
        }
    })


    const data = await res.json();

    const data2return = Object.entries(data);
    // Object.entries(data).forEach(([key, value]) => console.log(`key: ${key} value: ${value}`));

    let tablehtml = "<table><tr><th>Date</th><th>Count</th></tr>";
    let odd = true;
    Object.entries(data).forEach(([key, value]) => {
        if (odd) {
            tablehtml += `<tr class="test"><td>${key}</td><td>${value}</td></tr>`;
        } else {
            tablehtml += `<tr class="test2"><td>${key}</td><td>${value}</td></tr>`;
        }


        odd = !odd;
    })

    tablehtml += "</table>";

    document.getElementById("Daily-Case-Data").innerHTML = tablehtml;

    showDailyTab();
    return data2return;

}

async function getPerson() {
    const svgurl = "https://cws.auckland.ac.nz/Qz2021JGC/api/PersonIcon";
    try {
        // Fetch the SVG for the person icon
        const response = await fetch(svgurl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const svg = await response.text(); // Fetch the raw SVG text

        // Fetch the case counts data
        const tidytable = await caseCounts(); // Assuming caseCounts returns data after populating the table

        const tendays = tidytable.slice(-10); // Last 10 days of case data

        let svgwidth = 400;
        let svgheight = 400;
        let headerY = 15;
        let scaleY = headerY + 25;
        let scaleX = 80;

        let svgContainer = document.getElementById('svgContainer');
        svgContainer.innerHTML = svg; // Append the SVG person icon to the container
        svgContainer.innerHTML += `<text x="0" y="${headerY}" class="small">Last Ten days at a Glance</text>`;

        tendays.forEach(([date, value]) => {
            const whole = Math.floor(value / 10); // Whole person icons to show
            const percentage = value % 10; // Partial person icon

            svgContainer.innerHTML += `<text x="0" y="${scaleY}">${date}</text>`; // Add date text

            // Add whole person icons
            for (let i = 0; i < whole; i++) {
                svgContainer.innerHTML += `<use href="#person" x="${scaleX + (i * 20)}" y="${scaleY - 15}" width="20" height="20"></use>`;
            }

            // Add partial person icon using clip-path
            svgContainer.innerHTML += `
                <clipPath id="myClip${scaleY}">
                    <rect x="0" y="0" width="${((percentage / 10) * 20) + 1}" height="100" />
                </clipPath>
                <use href="#person" x="${scaleX + whole * 20}" y="${scaleY - 15}" width="20" height="20" clip-path="url(#myClip${scaleY})"></use>`;

            scaleY += 20; // Move the Y scale down for the next row
        });
    } catch (error) {
        console.error(error.message);
    }
}


getPerson();
versionAPI();
caseCounts();