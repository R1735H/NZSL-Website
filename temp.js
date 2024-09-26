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