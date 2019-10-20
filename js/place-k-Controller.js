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
    var userPrefs = {
        bcgColor: elBcgColor,
        txtColor: elTxtColor
    }
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
    var userInfo = {
        birthDate: elBirthDate,
        birthTime: elBirthTime
    }
    saveInfoToStorage(userInfo)
    showForecast()

    //Todo: handle the astrological forecast
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
    var strHTMLs = markers.map(marker => `<li onclick="onMarkerNameClick(${marker.id})">${marker.title}<button class="remove-btn" onclick="onRemoveBtn(event,${marker.id})">X</button></li>`)
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
    // 13 markers 
    // 35 chars
    // locationError()

    console.log('pp');

}

function toggleVideo() {
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