'use strict';

function initHomepage() {
    setUserPrefs()
}

function onSetPrefs() {
    //Todo : add validation to local storage
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

function setUserPrefs(){
    var userPrefs = loadColorsFromStorage()
    var elHompage = document.querySelector('.homepage')
    elHompage.style.backgroundColor = userPrefs.bcgColor
    elHompage.style.color = userPrefs.txtColor
}

function handleInfoSubmit(){
    var elBirthDate = document.querySelector('.birth-date').value
    var elBirthTime = document.querySelector('.birth-time').value
    var userInfo = {
        birthDate:elBirthDate,
        birthTime:elBirthTime
    }
    saveInfoToStorage(userInfo)

    //Todo: handle the astrological forecast
}