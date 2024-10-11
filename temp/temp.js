async function FetchActivityLog() {
    const apiUrl = "https://cws.auckland.ac.nz/nzsl/api/Log";
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();
  
    // Get Y-Axis Values
    const minElement = document.getElementById("minValue");
    const maxElement = document.getElementById("maxValue");
    let minAxisValue = Infinity;
    let maxAxisValue = -Infinity;
  
    data.forEach(item => {
      minAxisValue = Math.min(minAxisValue, item.visits, item.uniqueVisits);
      maxAxisValue = Math.max(maxAxisValue, item.visits, item.uniqueVisits);
    });
    minElement.textContent = minAxisValue;
    maxElement.textContent = maxAxisValue;
  
    // Get Dates
    const startElement = document.getElementById("startDate");
    const endElement = document.getElementById("endDate");
    const start = data[0].date;
    const end = data[data.length - 1].date;
    startElement.textContent = start;
    endElement.textContent = end;
  
    // Get Visit Strings
    const visitsList = data.map(item => item.visits);
    const uniqueVisitsList = data.map(item => item.uniqueVisits);
    const visitsTextElement = document.getElementById("visits");
    const uniqueVisitsTextElement = document.getElementById("uniqueVisits");
  
    const visitsText = visitsList.join(', ');
    const uniqueVisitsText = uniqueVisitsList.join(', ');
  
    visitsTextElement.textContent = "Visits: " + visitsText;
    uniqueVisitsTextElement.textContent = "Unique Visits: " + uniqueVisitsText;
  
    // Construct Polylines
    const chartWidth = 900;
    const chartHeight = 250;
    const xOffset = 75;
    const yTop = 25;
    const yBottom = 275;
  
    const totalPoints = data.length;
    const xInterval = chartWidth / (totalPoints - 1);
  
    const allDataValues = [...visitsList, ...uniqueVisitsList];
    const minDataValue = Math.min(...allDataValues);
    const maxDataValue = Math.max(...allDataValues);
  
    const scaleYValue = value => yBottom - ((value - minDataValue) / (maxDataValue - minDataValue) * chartHeight);
  
    const visitsPolylinePoints = visitsList.map((value, index) => {
      const x = xOffset + index * xInterval;
      const y = scaleYValue(value);
      return `${x},${y}`;
    });
  
    const uniqueVisitsPolylinePoints = uniqueVisitsList.map((value, index) => {
      const x = xOffset + index * xInterval;
      const y = scaleYValue(value);
      return `${x},${y}`;
    });
  
    const visitsPolylineElement = document.getElementById("visitsPolyline");
    const uniqueVisitsPolylineElement = document.getElementById("uniqueVisitsPolyline");
  
    visitsPolylineElement.setAttribute("points", visitsPolylinePoints.join(" "));
    uniqueVisitsPolylineElement.setAttribute("points", uniqueVisitsPolylinePoints.join(" "));
  
    console.log(data);
  }