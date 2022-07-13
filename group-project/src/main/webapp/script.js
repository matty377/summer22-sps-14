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

function initMap() {
  //default location is Google headquarters
  let location = {
    lat: 37.419857,
    lng: -122.078827,
  };

  let mapOptions = {
    center: location,
    zoom: 12
  };

  const mapContainer = document.getElementById('map');
  map = new google.maps.Map(mapContainer, mapOptions);

  const img = "https://img.icons8.com/plasticine/100/000000/user-location.png";

  function createMarker(location, map) {
    let marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: img
    });
  }

  if (navigator.geolocation) {
    console.log("Geolocation is supported!");

    navigator.geolocation.getCurrentPosition(
      (currentPosition) => {
        location.lat = currentPosition.coords.latitude;
        location.lng = currentPosition.coords.longitude;
        map = new google.maps.Map(mapContainer, mapOptions);
        createMarker(location, map);
      },
      (err) => {
        console.log("Access to Geolocation is denied!");
        console.log("Map is centered at default location.");
        console.log(err.message);
        map = new google.maps.Map(mapContainer, mapOptions);
        createMarker(location, map);
      }
    );
  } else {
    console.log("Geolocation is not supported by the browser!");
    console.log("Map is centered at default location ");
    map = new google.maps.Map(mapContainer, mapOptions);
    createMarker(location, map);
  }

  // Add Autocomplete
  let autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("search-input"),
    {
      type: ["establishment"],
      fields: ["geometry", "name"],
    }
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    //when user enters a location that is not suggested by autocomplete
    //or autocomplete fails to get a place
    if(!place.geometry){
        alert(`No details available for input: '${place.name}'\n
                Please select a location from the dropdown!`);
    } else {
        location = place.geometry.location;
        map = new google.maps.Map(mapContainer, {
                center: location,
                zoom: 12
        });
        createMarker(location,map);
    }
  });

  const keywordInput = document.getElementById('keyword');
  keywordInput.addEventListener('change', (e) => {
      e.preventDefault();
      map = new google.maps.Map(mapContainer, {
          center: location,
          zoom: 12
      });
      createMarker(location,map);

      let restContainer = document.getElementById('restaurants-cont');
      restContainer.innerHTML = '<h2>Restaurants Near You </h2>';

      //create PlacesService object to use nearbySearch
      let request = {
          location: location,
          radius: '5000',
          type: 'restaurant'
      };
      request.keyword = keywordInput.value;
      let service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
  });

}

//callback function passed into nearbySearch
function callback(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK){
        let currentInfoWindow = null;
        let qty = Math.min(3,results.length);
        for(let i = 0; i < qty; i++ ){
            let result = results[i];
            let contentString = 
                `<div style="color:black">`+
                `<h3>${result.name}</h3>` +
                `<p>Address: ${result.vicinity}</p>` +
                `<p>Price Level: ${result.price_level}/4</p>` +
                `<p>Rating: ${result.rating}/5 </p>`+
                `</div>`;
            let infoWindow = new google.maps.InfoWindow({
                content: contentString
            });
            let marker = new google.maps.Marker({
                position: result.geometry.location,
                map: map,
                label: result.name,
            });
            marker.addListener('click',() => {
                if (currentInfoWindow != null){
                    currentInfoWindow.close();
                };
                infoWindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
                currentInfoWindow = infoWindow;
            });

            //display Restaurants
            let newDiv = document.createElement('div');
            newDiv.classList.add('restaurant');
            document.querySelector('#restaurants-cont').appendChild(newDiv);
            let img = document.createElement('img');
            img.src = result.photos[0].getUrl();
            newDiv.appendChild(img);
            let infoBox = document.createElement('div');
            infoBox.innerHTML = contentString;
            newDiv.appendChild(infoBox);
            
        }
    }
}

  //imgSlider for thumbnail

function imgSlider(link) {
    document.querySelector('.food').src = link;
}

/**
 * Adds a food suggestion to the page.
 */
function addFoodSuggestion() {
  const suggestions = [
    "African",
    "American",
    "Asian",
    "European",
    "Central African",
    "East African",
    "North African",
    "South African",
    "West African",
    "North American",
    "Central American",
    "South American",
    "Caribbean",
    "Central Asian",
    "East Asian",
    "South Asian",
    "Southeast Asian",
    "West Asian",
    "Central European",
    "East European",
    "North European",
    "South European",
    "West European",
    "Oceanic",
    "BBQ",
    "Chinese",
    "French",
    "Hamburger",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "Pizza",
    "Seafood",
    "Steak",
    "Sushi",
    "Thai",
    "Noodles",
    "Dumplings",
    "Chicken",
    "Tacos",
    "Pasta",
    "Burger",
    "Sandwich",
    "Hotpot",
    "Salad",
    "BBQ Chicken",
    "Lobster Rolls",
    "Tuna casserole",
  ];

  // Pick a food suggestion.
  const suggestion =
    suggestions[Math.floor(Math.random() * suggestions.length)];

  // Add food suggestion to the page.
  const suggestionContainer = document.getElementById("suggestion-container");
  suggestionContainer.innerText = suggestion;
}

//Adds restaurants near you list to the page.
document.addEventListener("DOMContentLoaded", (e) => {
  let restaurants = [
    { name: "Joe’s Seafood", cost: "2" },
    { name: "Le Diplomate", cost: "3" },
  ];
  let container = document.getElementById("container");
  for (let i = 0; i < restaurants.length; i++) {
    let rest = document.createElement("div");
    rest.innerHTML = restaurants[i].name + " Cost: ";
    for (let j = 0; j < restaurants[i].cost; j++) {
      rest.innerHTML += "$";
    }
    container.appendChild(rest);
  }

  function getRestaurant() {
    fetch("/get-rest")
      .then((response) => response.json())
      .then((restaurants) => {
        restaurants.forEach((restaurant) => {
          //taskListElement.appendChild(createTaskElement(task));
          console.log(restaurant);
        });
      });
  }
});
