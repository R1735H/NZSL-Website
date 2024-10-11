let currentTab = "";

function showDailyTab() {
    if (currentTab!="daily") {
        currentTab = "daily";
        showNoTabs();
        document.getElementById("daily").style.backgroundColor = "lightgrey";
        document.getElementById("Daily-Case-Data").style.display = "block";
    }
}

function showInfoTab() {
    if (currentTab!="info") {
        currentTab = "info";
        showNoTabs();
        document.getElementById("info").style.backgroundColor = "lightgrey";
        document.getElementById("Infographics").style.display = "block";
    }
}

function showStatTab() {
    if (currentTab!="stat") {
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

window.onload = function() {
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
        headers : {
            "Accept" : "application/json",
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
    try {
        const res = await fetch("https://cws.auckland.ac.nz/Qz2021JGC/api/PersonIcon");

        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        const svg = await res.text();
        console.log(svg);

        const tbl = await caseCounts();

        const tenDays = tbl.slice(-10);
        console.log(tenDays);
        
        svgwidth = 400;
        svgheight = 400;
        headerY = 15;
        scaleY = headerY + 25;
        scaleX = 80;

        svgContainer = document.getElementById("svgContainer");
        svgContainer.innerHTML += svg;
        svgContainer.innerHTML += `<text x="0" y="${headerY}" class="small">Last 10 Days at a glance</text>`;

        tenDays.forEach(([date, value]) => {
            const whole = Math.floor(value/10);
            const percentage = value % 10;
            console.log(value, whole, percentage);

            svgContainer.innerHTML += `<text x="0" y="${scaleY}">${date}</text>`;

            for (i = 0; i < whole; i++) {
                svgContainer.innerHTML += `<use href="#person" x="${scaleX + (i*20)}" y="${scaleY-15}" width="20" height="20"></use>`;
            }

            svgContainer.innerHTML += 
            `<clipPath id="myClip${scaleY}">
            <rect x="0" y="0" width="${((percentage / 10) * 20) + 1}" height="100" />
            </clipPath>
            <use href="#person" x="${scaleX + i * 20}" y="${scaleY - 15}" width="20" height="20" clip-path="url(#myClip${scaleY})"></use>`;
            
            scaleY += 20;
        }); 
        
    } catch (error) {
        console.error(error.message);
    }
}

getPerson();
versionAPI();
caseCounts();