'use strict';

var gMap;

function initMap(lat = 29.55805, lng = 34.94821, zoom = 10) {
    gMap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat,
            lng
        },
        zoom
    });
}

function onSetCurrLoc() {
    if (!navigator.geolocation) {
        alert("Plz switch to Google Chrome its 2019");
        return;
    }
    navigator.geolocation.getCurrentPosition(setCurrLoc, handleLocationError);
}

function setCurrLoc(position) {
    console.log(position);

    initMap(position.coords.latitude, position.coords.longitude, 16);
    setMarker(position.coords.latitude, position.coords.longitude,'You are here')
}

function handleLocationError(error) {
    var locationError = document.querySelector(".locationError");

    switch (error.code) {
        case 0:
            locationError.innerText = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerText = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerText = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerText = "The browser timed out before retrieving the location.";
            break;
    }
}

function setMarker(lat, lng, title) {
    var marker = new google.maps.Marker({
        position: {
            lat,
            lng
        },
        map: gMap,
        title
    });
}