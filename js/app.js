// Initializing the Map
var mymap = L.map('my-map').setView([28.6041, 77.1025], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2hyYWRoYWthdHlhbCIsImEiOiJjam1kbHJzeWs2YTYzM3BwNDZvaTQ4N3ltIn0.8MFs3lWffgKywgmrM3hymA'
}).addTo(mymap);

// Adding default markers to the map
var marker = L.marker([28.5426, 77.1831]).addTo(mymap);
var marker = L.marker([28.5562, 77.1000]).addTo(mymap);
var marker = L.marker([28.5244, 77.1855]).addTo(mymap);
var marker = L.marker([28.5932, 77.2506]).addTo(mymap);
var marker = L.marker([28.6562, 77.2410]).addTo(mymap);
