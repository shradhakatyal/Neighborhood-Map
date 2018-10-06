var viewModel, place, map;
var markers = [];

//Client id and secret for the Foursquare API
var CLIENT_ID = "0RPZZONT1T0CSYPX2KCESXOG5SPAXE3BOO34RKTJY1HQY2ZI";
var CLIENT_SECRET = "NAZQIKCE5AQC0GSYB2KVJ3KJFNDMJCTMZLTC1G3Y3YPVQWET";

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
},
{
    name: "Akshardham Temple",
    location: {
        "lat": 28.6127,
        "lng": 77.2773
    }
},
{
    name: "Jama Masjid",
    location: {
        "lat": 28.6507,
        "lng": 77.2334
    }
},
{
    name: "Jantar Mantar",
    location: {
        "lat": 28.6271,
        "lng": 77.2166
    }
},
{
    name: "Agrasen Ki Baoli",
    location: {
        "lat": 28.6260,
        "lng": 77.2250
    }
},
{
    name: "Rail Museum",
    location: {
        "lat": 28.5858,
        "lng": 77.1798
    }
},
{
    name: "National Museum",
    location: {
        "lat": 28.6118,
        "lng": 77.2195
    }
}
]

// Initialising the map
function initMap() {
    var center = {lat: 28.6315, lng: 77.2167}
    map = new google.maps.Map(
        document.getElementById('my-map-js'), {zoom: 11, center: center});

    // Populating the markers onto the map
    for(var index = 0;index<places.length;index++) {
        // Using IIFE to add markers and adding click event listener to each marker.
        (function() {
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
                infoWindow.setContent(contentString);
            });

            // Function to set the info window
            function setInfoWindow(marker, infoWindow) {
                if (infoWindow.marker != marker) {
                    infoWindow.marker = marker;
                    infoWindow.setContent("<div class='title'>" + marker.title + "</div>" + marker.contentString);
                }
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 500);
                infoWindow.open(map, marker);
                
                infoWindow.addListener('closeclick', function() {
                    infoWindow.setMarker = null;
                });

                //Automatically close info window after 3 seconds
                window.setTimeout(function(){
                    infoWindow.close();
                }, 3000);
            }

            // Fetching data from foursquare api for each marker

            // foursquare api url
            var foursquareUrl = "https://api.foursquare.com/v2/venues/search";
            var contentString;
            var venue, address, category, linkId;
            // ajax request - foursquare api data (https://developer.foursquare.com/docs/)
            $.ajax({
                url: foursquareUrl,
                dataType: "json",
                data: {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    query:  marker.title,
                    near: "Delhi",
                    v: 20181005 
                },
                success: function(data) {
                        // Storing information about venue.
                        venue = data.response.venues[0];

                        // Storing the address and category of the venue.
                        address = venue.location.formattedAddress;
                        category = venue.categories[0].name;
                        
                        // The following url is used to get more information about a particular venue depending on the venue id.
                        linkId = "https://foursquare.com/v/" + venue.id;
                        
                        photoUrl = "https://api.foursquare.com/v2/venues/"+venue.id+"/photos";
                        
                        // Setting the content string with data retrieved from the API.
                        contentString = "<div class='name'>" + "Name: " + venue.name + "</div>" +
                            "<div class='category'>" + "Catergory: " + category + "</div>" +
                            "<div class='address'>" + "Location: " + address + "</div>" +
                            "<div class='information'>" + "More information: " + "<a href='" + linkId + "'>" + "Click here" + "</a></div>";
                            // Getting the photo for the venue using another ajax request
                            getPhoto(photoUrl);

                            // Setting the content string of the marker.
                            marker.contentString;
                },
                error: function() {
                    contentString = "<div class='error'>Something went wrong. Please try again later.</div>"
                }
            });

            // Function to get the photo of the venue.
            function getPhoto(url) {
                $.ajax({
                    url: url,
                    data: {
                        client_id: CLIENT_ID,
                        client_secret: CLIENT_SECRET,
                        v: 20181005
                    },
                    success: function(data) {
                        console.log(data);
                        var imgUrl = data.response.photos.items[0].prefix+'100x100'+data.response.photos.items[0].suffix;
                        contentString = "<div class='image'><img src='"+imgUrl+"'></div>"+contentString;
                    },
                    error: function(err) {
                        contentString = "<div class='error'>Venue photos are not available. Reason: "+err.responseJSON.meta.errorDetail+"</div>"+contentString;
                    }
                });
            }
        })();
    }
}

// Create Location object
function createLocation(location) {
    var self = this;
    self.name = location.name;
    self.location = location.location;
    // show is declared as an observable because when it changes the DOM will get updated.
    self.show = ko.observable(true);
}

function ViewModel() {
    var self = this;

    // Place is declared as an observable array since it will store an array of locations.
    self.place = ko.observableArray();

    // Search query is declared as a ko observable.
    self.searchQuery = ko.observable('');

    // Adding places to the place array to be displayed in a list view.
    for(var i=0;i<places.length;i++) {
        var tempPlace = new createLocation(places[i]);
        self.place.push(tempPlace);
    }

    // Method on view model to filter places based on the search string.
    self.filterPlaces = ko.computed(function() {
        var filter = self.searchQuery().toLowerCase();
        for(var i=0;i<self.place().length;i++) {
            if(self.place()[i].name.toLowerCase().indexOf(filter) > -1) {
                console.log(self.place()[i].name);
                self.place()[i].show(true);
                // Show marker for matching places.
                if(self.place()[i].marker) {
                    self.place()[i].marker.setVisible(true)
                }
            } else {
                // Hide places that do not match and also hide their markers from the map.
                self.place()[i].show(false);
                if(self.place()[i].marker) {
                    self.place()[i].marker.setVisible(false)
                }
            }
        }
    });

    // This method triggers a click event on the marker when a location is clicked in the list.
    self.showLocationOnMap = function(locations) {
        google.maps.event.trigger(locations.marker, 'click');
    };
}

var viewModel = new ViewModel()

// Activate knockout apply binding
ko.applyBindings(viewModel);


// Function to toggle menu using hamburger icon for screens < 768px
function toggleMenu(el) {
    if(screen.width <= 768) {
        var listView = document.querySelector('.list-view');
        var menuContainer = document.querySelector('.menu-container');

        menuContainer.classList.toggle('change');
        if(window.getComputedStyle(listView).display === 'none') {
            listView.style.display = 'block';
        } else if(window.getComputedStyle(listView).display === 'block') {
            listView.style.display = 'none';
        }
    }
}
