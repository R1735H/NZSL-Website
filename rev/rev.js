const elem = document.getElementById("pickThis");

elem.addEventListener("click", () => { elem.style.color = "red"; });



const someJsonString =
'{ "courseId": "COMPCI 101", "title": "Programming Intro 1" }';
const myObj = JSON.parse(someJsonString);
alert(myObj.title);

const jsonString = JSON.stringify(myObj);
// alert(jsonString);