// async function pickItems() {
//     const url = "https://services.odata.org/Northwind/Northwind.svc/Orders?$format=json";
//     const res = await fetch(url);

//     const data = await res.json();
//     populateItems(data.value)

// }

/* Example wants us to use accept to forcefully make the data come in json format, 
   as the original data is not in json format*/

let fetchedUrls = {};
async function pickItems() {
    

    // fetch("https://services.odata.org/Northwind/Northwind.svc/Orders", {
    //     headers: {
    //         "Accept": "application/json"
    //     }
    // })
    // .then(res => res.json())
    // .then(result => populateItems(result.value))
    const url = "https://services.odata.org/Northwind/Northwind.svc/Orders?$format=json";
    if (fetchedUrls[url]) return;
    fetchedUrls[url] = true;
    
    const res = await fetch(url, {
        headers: {
            "Accept" : "application/json",
        }
    })
    const data = await res.json();
    populateItems(data.value);

    if (data["odata.nextLink"]) {
        pickItems(data["odata.nextLink"]);
    }
}



function populateItems(items) {
    // alert(items);


    const divContainer = document.getElementById("nwContainer");
    let odd = true;
    items.forEach((item) => {       
        const newItem = document.createElement("div");
        newItem.className = odd ? "odd" : "even";

        const itemContent = `
        <div>
        <img src = "https://www.svgrepo.com/show/3493/wine-glass.svg" style="width: 80px; float: right;"/> 
        <h2>${item.OrderID}</h2>
        <p>${item.ShipAddress},
        ${item.ShipCity},
        ${item.ShipPostalCode}
        ${item.ShipCountry} 
        </p>
        </div>       
        `;
        newItem.innerHTML = itemContent;

        divContainer.appendChild(newItem);
        odd = !odd;

    });
}
























pickItems();