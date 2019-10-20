'use strict';

const USER_PREF = 'user-prefs'

function saveColorsToStorage(userPrefs) {
    saveToStorage(USER_PREF,userPrefs)
}

function loadColorsFromStorage(){
    var userPrefs = loadFromStorage(USER_PREF)
    return userPrefs
}

function saveInfoToStorage(userInfo){
    saveToStorage('user-info',userInfo)
}