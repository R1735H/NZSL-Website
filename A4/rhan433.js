/* 
    Made by Ritesh Hanmanthu, 
*/


let currentTab = "";

function ShowTabP1() {
    if (currentTab != "part1") {
        currentTab = "part1";
        showNoTabs()
        document.getElementById("part1-img").style.display = "block";
        document.getElementById("part2-log").style.display = "none";
    }
}

function ShowTabP2() {
    if (currentTab != "part2") {
        currentTab = "part2";
        showNoTabs()
        document.getElementById("part1-img").style.display = "none";
        document.getElementById("part2-log").style.display = "block";
    }
}

function showNoTabs() {
    document.getElementById("part1-img").style.display = "none";
    document.getElementById("part2-log").style.display = "none";
}

window.onload = function () {
    ShowTabP1();
}




const svg = document.getElementById('visitLogSvg');
const padding = 70;
const width = 660;
const height = 250;
const graphWidth = width - 2 * padding;
const graphHeight = height - 2 * padding;

// Fetch the log data from the API
fetch('https://cws.auckland.ac.nz/nzsl/api/Log')
    .then(response => response.json())
    .then(data => {
        const logData = data;
        // console.log(logData);
        const maxVisits = Math.max(...logData.map(d => d.visits));
        const minVisits = Math.min(...logData.map(d => d.visits));
        const maxUnique = Math.max(...logData.map(d => d.uniqueVisits));
        const minUnique = Math.min(...logData.map(d => d.uniqueVisits));
        const maxY = Math.max(maxVisits, maxUnique);
        const minY = Math.min(minVisits, minUnique);

        // Scales for x and y
        const scaleX = (i) => (padding + (i / (logData.length - 1)) * graphWidth);
        const scaleY = (y) => height - padding - ((y - minY) / (maxY - minY)) * graphHeight;

        // Clipping path to constrain drawing inside the rectangle border
        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        clipPath.setAttribute('id', 'clip');
        const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        clipRect.setAttribute('x', padding);
        clipRect.setAttribute('y', padding);
        clipRect.setAttribute('width', graphWidth);
        clipRect.setAttribute('height', graphHeight);
        clipPath.appendChild(clipRect);
        svg.appendChild(clipPath);

        // The graph boundary
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', padding);
        rect.setAttribute('y', padding);
        rect.setAttribute('width', graphWidth);
        rect.setAttribute('height', graphHeight);
        rect.setAttribute('stroke', 'black');
        rect.setAttribute('fill', '#a9a9a9');
        svg.appendChild(rect);

        // Paths for visits and uniqueVisits (within clipPath)
        let visitsPath = `M ${scaleX(0)} ${scaleY(logData[0].visits)}`;
        let uniqueVisitsPath = `M ${scaleX(0)} ${scaleY(logData[0].uniqueVisits)}`;

        for (let i = 1; i < logData.length; i++) {
            visitsPath += ` L ${scaleX(i)} ${scaleY(logData[i].visits)}`;
            uniqueVisitsPath += ` L ${scaleX(i)} ${scaleY(logData[i].uniqueVisits)}`;
        }

        // The visits path (clipped)
        const visitsLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        visitsLine.setAttribute('d', visitsPath);
        visitsLine.setAttribute('fill', 'none');
        visitsLine.setAttribute('stroke', 'red');
        visitsLine.setAttribute('stroke-width', 2);
        visitsLine.setAttribute('clip-path', 'url(#clip)');
        svg.appendChild(visitsLine);

        // The unique visits path (clipped)
        const uniqueVisitsLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        uniqueVisitsLine.setAttribute('d', uniqueVisitsPath);
        uniqueVisitsLine.setAttribute('fill', 'none');
        uniqueVisitsLine.setAttribute('stroke', 'green');
        uniqueVisitsLine.setAttribute('stroke-width', 2);
        uniqueVisitsLine.setAttribute('clip-path', 'url(#clip)');
        svg.appendChild(uniqueVisitsLine);

        // Title for the graph
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', width / 2 - 40);
        title.setAttribute('y', padding - 10);
        title.setAttribute('font-size', '14');
        title.setAttribute('text-anchor', 'left');
        title.setAttribute('font-family', 'Courier New');
        title.textContent = "Visit Log";
        svg.appendChild(title);

        // Start date on the x-axis
        const startDateText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        startDateText.setAttribute('x', 50);
        startDateText.setAttribute('y', height - padding + 20);
        startDateText.setAttribute('font-size', '6');
        startDateText.setAttribute('text-anchor', 'start');
        startDateText.setAttribute('font-family', 'Courier New');
        startDateText.textContent = logData[0].date;
        svg.appendChild(startDateText);

        // End date on the x-axis
        const endDateText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        endDateText.setAttribute('x', width - padding);
        endDateText.setAttribute('y', height - padding + 20);
        endDateText.setAttribute('font-size', '6');
        endDateText.setAttribute('text-anchor', 'end');
        endDateText.setAttribute('font-family', 'Courier New');
        endDateText.textContent = logData[logData.length - 1].date;
        svg.appendChild(endDateText);

        // y-axis (visits)
        const yLabels = [minY, (minY + maxY) / 2, maxY];
        yLabels.forEach((yValue) => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', padding - 10);
            text.setAttribute('y', scaleY(yValue));
            text.setAttribute('font-size', '6');
            text.setAttribute('text-anchor', 'end');
            text.setAttribute('font-family', 'Courier New');
            text.textContent = Math.round(yValue);
            svg.appendChild(text);
        });

        // Legend
        const legendGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        legendGroup.setAttribute('transform', `translate(${padding}, ${height - 20})`)

        const legendTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        legendTitle.setAttribute('font-size', '12');
        legendTitle.setAttribute('text-anchor', 'left');
        legendTitle.textContent = "Legend:";
        legendGroup.appendChild(legendTitle);

        // Visits rect
        const visitsRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        visitsRect.setAttribute('x', 50);
        visitsRect.setAttribute('y', -4);
        visitsRect.setAttribute('width', 30);
        visitsRect.setAttribute('height', 2);
        visitsRect.setAttribute('fill', 'red');
        legendGroup.appendChild(visitsRect);

        // Text for Visits
        const visitsText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        visitsText.setAttribute('x', 85);
        visitsText.setAttribute('y', 0);
        visitsText.setAttribute('font-size', '12');
        visitsText.setAttribute('fill', 'red');
        visitsText.textContent = 'Visits';
        legendGroup.appendChild(visitsText);

        // Unique Visits rect
        const uniqueVisitsRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        uniqueVisitsRect.setAttribute('x', 120);
        uniqueVisitsRect.setAttribute('y', -4);
        uniqueVisitsRect.setAttribute('width', 30);
        uniqueVisitsRect.setAttribute('height', 2);
        uniqueVisitsRect.setAttribute('fill', 'green');
        legendGroup.appendChild(uniqueVisitsRect);

        // Text for Unique Visits
        const uniqueVisitsText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        uniqueVisitsText.setAttribute('x', 155);
        uniqueVisitsText.setAttribute('y', 0);
        uniqueVisitsText.setAttribute('font-size', '12');
        uniqueVisitsText.setAttribute('fill', 'green');
        uniqueVisitsText.textContent = 'Unique Visits';
        legendGroup.appendChild(uniqueVisitsText);

        svg.appendChild(legendGroup);


        // Coordinates at the bottom of the SVG
        const visitList = logData.map(d => d.visits).join(',');
        // console.log(visitList);
        const coordinatesText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        coordinatesText.setAttribute('x', width / 2);
        coordinatesText.setAttribute('y', height + 10);
        coordinatesText.setAttribute('font-size', '5');
        coordinatesText.setAttribute('text-anchor', 'middle');
        coordinatesText.textContent = visitList || "Error";
        svg.appendChild(coordinatesText);

        const uniqueVisitList = logData.map(d => d.uniqueVisits).join(',');
        const uniqueCoordinatesText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        uniqueCoordinatesText.setAttribute('x', width / 2);
        uniqueCoordinatesText.setAttribute('y', height + 20);
        uniqueCoordinatesText.setAttribute('font-size', '5');
        uniqueCoordinatesText.setAttribute('text-anchor', 'middle');
        uniqueCoordinatesText.textContent = uniqueVisitList || "Error";
        svg.appendChild(uniqueCoordinatesText);
    })
    .catch(error => console.error('Error fetching the log data:', error));