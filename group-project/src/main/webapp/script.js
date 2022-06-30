// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


let map;

//initMap(): is a callback function,
//           will be executed after the Google Map API Async Script loads

function initMap(){

    //default location is Google headquarters
    let location = {
        lat: 37.419857,
        lng: -122.078827
    };

    let mapOptions = {
        center: location,
        zoom: 9
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    function createMarker(location, map){
        let marker = new google.maps.Marker({
            position: location,
            map: map
        })
    }

    if(navigator.geolocation) {

        console.log('Geolocation is supported!');

        navigator.geolocation.getCurrentPosition(
            (currentPosition) => {
                location.lat = currentPosition.coords.latitude;
                location.lng = currentPosition.coords.longitude;
                map = new google.maps.Map(document.getElementById('map'), mapOptions);
                createMarker(location, map);

            },
            (err) => {
                console.log('Access to Geolocation is denied!');
                console.log('Map is centered at default location.');
                console.log(err.message);
                map = new google.maps.Map(document.getElementById('map'), mapOptions);
                createMarker(location, map);
            }
        )

    } else {
        console.log('Geolocation is not supported by the browser!');
        console.log('Map is centered at default location ');
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        createMarker(location, map);
    }

}

/**
 * Adds a food suggestion to the page.
 */
function addFoodSuggestion() {
    const suggestions =
        ['African', 'American', 'Asian', 'European', 'Central African', 'East African', 'North African', 'South African', 'West African', 'North American', 'Central American', 'South American', 'Caribbean', 'Central Asian', 'East Asian', 'South Asian', 'Southeast Asian', 'West Asian', 'Central European', 'East European', 'North European', 'South European', 'West European', 'Oceanic', 'BBQ', 'Chinese', 'French', 'Hamburger', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Pizza', 'Seafood', 'Steak', 'Sushi', 'Thai'];

    // Pick a food suggestion.
    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    // Add food suggestion to the page.
    const suggestionContainer = document.getElementById('suggestion-container');
    suggestionContainer.innerText = suggestion;
}