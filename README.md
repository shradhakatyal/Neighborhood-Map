# Neighborhood Map Project
This is a single page application featuring a map of a neighborhood I would like to visit. The map has features such as highlighted locations, third-party data about those locations and a mechanism to filter the default locations of the map.

## About
This is a web application that displays some place of interest in New Delhi on a map. The places can also be viewed in a list form. On clicking on the name of a place, a marker opens up with a few details about the place. The markers on the map can be clicked too, to open the info window. An input box is provided that filters the places and shows only those places that match the search query string. The project makes use of Vanilla JavaScript, jQuery(for ajax requests), Knockout.js(a MVVM framework), Google Maps API and Foursquare API(for providing additional information about the place).

## Architecture
- Google Maps API is used to render the map and markers on screen.
- Knockout's Model-View-ViewModel mechanism is used to render the DOM.
- Foursquare(non-google) API is used to display some additional information about the locations.
- CSS is used to make the application responsive.

## Running the Application
- Clone the project using the command: git clone https://github.com/shradhakatyal/Neighborhood-Map.git
- Or, download the zip file by clicking on Download ZIP.
- Extract the files.
- Open index.html to run the application.

## Resources
- [Knockout js](https://knockoutjs.com/documentation/observables.html)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Foursquare API](https://developer.foursquare.com/docs)