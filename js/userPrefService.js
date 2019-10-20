'use strict';

const USER_PREF = 'user-prefs'

function saveColorsToStorage(userPrefs) {
    saveToStorage(USER_PREF, userPrefs)
}

function loadColorsFromStorage() {
    var userPrefs = loadFromStorage(USER_PREF)
    return userPrefs
}

function saveInfoToStorage(userInfo) {
    saveToStorage('user-info', userInfo)
}

function getAstroForecast() {
    var forecast = [
        'This week Uranus moved to a weird spot. You should beware of fishy sandwiches. Literally.',
        'Dont run and chew bubble gum at the same time.',
        'If you will pick the correct numbers - you can win the lottery!'
    ]
    return forecast[getRandomInt(0, 3)]
}