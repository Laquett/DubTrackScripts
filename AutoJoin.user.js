// ==UserScript==
// @name         [Dubtrack] AutoJoin
// @namespace    None
// @version      0.1
// @description  Dubtrack Autojoin Queue
// @author       Laquett
// @match        http://*.dubtrack.fm/*
// @match        https://*.dubtrack.fm/*
// @grant        none
// ==/UserScript==

var DubTrack = document;

setTimeout(function() {
    'use strict';

    var inQueue = queueActive();

    if (inQueue) {
        DubTrack.Events.unbind("realtime:room_playlist-update", autoJoin);
        return;
    }else{
        Dubtrack.Events.bind("reatime:room_playlist-update", autoJoin);
        autoJoin();
    }

}, 10000);

function queueActive() {

    var leave = document.getElementsByClassName('leave-button');
    if (leave)
        return false;
    else
        return true;
}

function autoJoin() {

    var inQueue = queueActive();

    if (inQueue) {
        DubTrack.Events.unbind("realtime:room_playlist-update", autoJoin);
        return;
    }

    $('.play-song-link').click();
}
