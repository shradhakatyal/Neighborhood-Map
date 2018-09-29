var viewModel, place;

// A list of places added by default to the map

var places = [
{
    name: "India Gate", 
    location:{
        "lat": 28.6129,
        'lng': 77.2295
    }
},
{
    name: "Lotus Temple",
    location: {
        "lat": 28.5535,
        "lng": 77.2588
    }
},
{
    name: "Qutub Minar",
    location: {
        "lat": 28.5244,
        'lng': 77.1855
    }
},
{
    name: "Red Fort", 
    location: {
        "lat": 28.6562,
        "lng": 77.2410
    }
},
{
    name: "Humayun's Tomb",
    location: {
        "lat": 28.5932,
        "lng": 77.2506
    }
},
{
    name: "Lodi Gardens", 
    location: {
        "lat": 28.5931,
        "lng": 77.2197
    }
}
]

// Initialising the map
function initMap() {
    var center = {lat: 28.6315, lng: 77.2167}
    var map = new google.maps.Map(
        document.getElementById('my-map-js'), {zoom: 12, center: center});
    
    // Populating the markers onto the map
    for(var index = 0;index<places.length;index++) {
        var place = places[index];
        var marker = new google.maps.Marker({
            position: place["location"],
            map: map,
            title: place["name"],
            animation: google.maps.Animation.DROP
        });
    }
}

function createLocationArray(places) {
    var temp = [];
    for(var i=0;i<places.length;i++) {
        var obj = {"name": places[i].name}
        temp.push(obj);
    }
    return temp;
}

function ViewModel() {
    var self = this;
    var place = createLocationArray(places)
    self.place = ko.observableArray(place);
    self.searchQuery = ko.observable('');

    self.filterPlaces = function() {
        var filter = self.searchQuery().toLowerCase();
        place = self.place().filter(function(p) {
            return p.name.toLowerCase().indexOf(filter) > -1
        });
        console.log(place);
    }
}

// activate knockout apply binding
ko.applyBindings(new ViewModel());



