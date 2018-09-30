var viewModel, place, map;
var markers = [];

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
    map = new google.maps.Map(
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
        // Storing all the markers in an array.
        markers.push(marker);
        
        // Assigning marker property to place array.
        viewModel.place()[index].marker = marker;

        var infoWindow = new google.maps.InfoWindow();
        // Click listener to open info window when a marker is clicked.
        marker.addListener('click', function() {
            setInfoWindow(this, infoWindow);
            // infoWindow.setContent(contentString);
        });
    }
}

// Function to set the info window
function setInfoWindow(marker, infoWindow, title) {
    // Check if the marker is closed or not.
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div class="title">' + marker.title + '</div>');

        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 500);
        infoWindow.open(map, marker);
        infoWindow.addListener('closeclick', function() {
            infoWindow.setMarker = null;
        });
    }
}


// Create Location object
function createLocation(location) {
    var self = this;
    self.name = location.name;
    self.location = location.location;
    self.show = ko.observable(true);
}

function ViewModel() {
    var self = this;

    // Place is defined as an observable array since it will store an array of locations
    self.place = ko.observableArray();
    self.searchQuery = ko.observable('');

    for(var i=0;i<places.length;i++) {
        var tempPlace = new createLocation(places[i]);
        self.place.push(tempPlace);
    }

    self.filterPlaces = ko.computed(function() {
        var filter = self.searchQuery().toLowerCase();
        for(var i=0;i<self.place().length;i++) {
            if(self.place()[i].name.toLowerCase().indexOf(filter) > -1) {
                console.log(self.place()[i].name);
                self.place()[i].show(true);
                if(self.place()[i].marker) {
                    self.place()[i].marker.setVisible(true)
                }
            } else {
                self.place()[i].show(false);
                if(self.place()[i].marker) {
                    self.place()[i].marker.setVisible(false)
                }
            }
        }
    })

    self.place.subscribe(function(place) {
        console.log('here')
        self.filterPlaces(place);
    });
}

var viewModel = new ViewModel()

// activate knockout apply binding
ko.applyBindings(viewModel);

function toggleMenu(el) {
    if(screen.width <= 768) {
        var listView = document.querySelector('.list-view');
        el.classList.toggle('change');
        console.log(listView.style.display);
        if(window.getComputedStyle(listView).display === 'none') {
            listView.style.display = 'block';
        } else if(window.getComputedStyle(listView).display === 'block') {
            listView.style.display = 'none';
        }
    }
}