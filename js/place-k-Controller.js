'use strict';

function initHomepage() {
    setUserPrefs()
}

function initMapPage() {
    loadMarkersFromStorage()
    initMarkers()
    renderMarkers()
}

function onSetPrefs() {
    var elBcgColor = document.querySelector('.bcg-color').value
    var elTxtColor = document.querySelector('.txt-color').value
    var elConfirmMsg = document.querySelector('.confirm')
    var userPrefs = {
        bcgColor: elBcgColor,
        txtColor: elTxtColor
    }
    elConfirmMsg.classList.remove('hide')
    setInterval(()=>{
        elConfirmMsg.classList.add('hide')
    },3000)
    saveColorsToStorage(userPrefs)
}

function onSubmitForm(ev) {
    ev.preventDefault()
}

function onInputChange() {
    document.querySelector('.set-colors-btn').focus()
}

function setUserPrefs() {
    var userPrefs = loadColorsFromStorage()
    var elHompage = document.querySelector('.homepage')
    if (!userPrefs) {
        elHompage.style.color = `black`
        return
    }
    document.querySelector('.homepage-header').style.backgroundColor = userPrefs.bcgColor
    document.querySelector('.homepage-main').style.backgroundColor = userPrefs.bcgColor
    elHompage.style.color = userPrefs.txtColor
}

function onInfoSubmit() {
    var elBirthDate = document.querySelector('.birth-date').value
    var elBirthTime = document.querySelector('.birth-time').value
    var elEmail = document.querySelector('.email').value
    var elVolume = document.querySelector('.music').value
    if (!elEmail) return
    var userInfo = {
        birthDate: elBirthDate,
        birthTime: elBirthTime,
        email: elEmail,
        volume: elVolume
    }
    saveInfoToStorage(userInfo)
    showForecast()
}

function showForecast() {
    var elForecast = document.querySelector('.forecast-txt')
    var elForecastImg = document.querySelector('.forecast-img')
    elForecast.innerText = getAstroForecast()
    elForecast.classList.remove('hide')
    elForecastImg.classList.remove('img-hide')
}

function renderMarkers() {
    var markers = getMarkers()
    var strHTMLs = markers.map(marker => `<li onclick="onMarkerNameClick(${marker.id})">
                                            ${marker.title}<button class="remove-btn" onclick="onRemoveBtn(event,${marker.id})">X</button>
                                         </li>`)
    document.querySelector('.markers').innerHTML = strHTMLs.join('')
}

function onRemoveBtn(ev, markerId) {
    ev.stopPropagation()
    removeMarker(markerId)
    renderMarkers()
}

function onMarkerNameClick(markerId) {
    var markers = getMarkers()
    var marker = markers.find(marker => marker.id === markerId)
    setMapCenter(marker.lat, marker.lng);
}

function onAddMarkerName() {
    var currLoc = getCurrLoc()
    var elMarkerName = document.querySelector('.marker-name-input')
    setMarker(currLoc, elMarkerName.value);
    elMarkerName.value = ''
    elMarkerName.blur()
}

function onToggleVideo() {
    var elVid = document.querySelector(".earth-vid");
    var elVidBtn = document.querySelector(".vid-btn");
    if (elVid.paused) {
        elVid.play();
        elVidBtn.innerHTML = "Pause";
    } else {
        elVid.pause();
        elVidBtn.innerHTML = "Play";
    }
}

function onToggleMarkers() {
    var elBtn = document.querySelector('.toggle-all-btn')
    if (elBtn.innerText === 'Hide Markers') {
        hideMarkers()
        elBtn.innerText = 'Show Markers'
    }
    else {
        showMarkers()
        elBtn.innerText = 'Hide Markers'
    }

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

function onRemoveMarkers() {
    if (!confirm('Sure you want to delete ALL markers and places?')) return
    removeMarkers()
    renderMarkers()

}

function showVolume(newVal) {
    document.querySelector(".volume").innerText = newVal;
}

