const API_KEY = "8d763d6f6236f1820d4c2efad17c3570";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("weatherResult");
const historyDiv = document.getElementById("history");
const logs = document.getElementById("logs");


function log(message){
console.log(message);
logs.textContent += message + "\n";
}

searchBtn.addEventListener("click",()=>{
let city = cityInput.value.trim();

log("1 Button Clicked");

if(city===""){
alert("Enter city name");
return;
}

fetchWeather(city);
saveHistory(city);
});


async function fetchWeather(city){

log("2 Before fetch()");

try{

let response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
);

if(!response.ok){
throw new Error("City not found");
}

let data = await response.json();

log("3 Data received");

displayWeather(data);
saveHistory(city);

}
catch(error){

log(" Error: "+error.message);
result.innerHTML = "City not found";

}

log("4 After fetch()");
}


function displayWeather(data){

result.innerHTML = `
<p><b>City:</b> ${data.name}</p>
<p><b>Temp:</b> ${data.main.temp} °C</p>
<p><b>Weather:</b> ${data.weather[0].main}</p>
<p><b>Humidity:</b> ${data.main.humidity}%</p>
<p><b>Wind:</b> ${data.wind.speed} m/s</p>
`;

}


function saveHistory(city){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(city)){
history.push(city);
localStorage.setItem("cities",JSON.stringify(history));
}

displayHistory();

}


function displayHistory(){

historyDiv.innerHTML="";

let history = JSON.parse(localStorage.getItem("cities")) || [];

history.forEach(city=>{

let btn=document.createElement("button");

btn.textContent=city;

btn.onclick=()=>fetchWeather(city);

historyDiv.appendChild(btn);

});

}


displayHistory();