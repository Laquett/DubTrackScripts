// ==UserScript==
// @name         [Dubtrack] AutoJoin
// @namespace    None
// @version      0.2
// @description  Dubtrack Autojoin Queue
// @author       Anon
// @match        http://*.dubtrack.fm/*
// @match        https://*.dubtrack.fm/*
// @grant        none
// ==/UserScript==

setTimeout(function() {
    'use strict';

    Dubtrack.Events.bind("reatime:room_playlist-update", autoJoin);
    autoJoin();
}, 15000);

function autoJoin() {

    if (Dubtrack.playerController.inQueue)
        return;
    else
        $('.play-song-link').click();

}
