// ==UserScript==
// @name         [Dubtrack] Song Check
// @namespace    None
// @version      0.1
// @description  Displays a sysnotify if new song is a known earrape
// @author       Laquett
// @match        http://*.dubtrack.fm/*
// @match        https://*.dubtrack.fm/*
// @grant        none
// ==/UserScript==

var DubTrack = document;

setTimeout(function() {
    'use strict';

    Dubtrack.Events.bind("realtime:room_playlist-update", checkSong);
    checkSong();

    //var results = window.open("about:blank", "", "_blank");
    //results.document.write("Started" + "<br>");




    //var nextSong = document.getElementsByClassName('.queue-item');
    //results.document.write("nextSong: " + nextSong);

    //DubTrack.Events.unbind("realtime:room_playlist-update", checkSong);
}, 5000);

function checkSong() {
    var song = Dubtrack.room.player.activeSong.get('songInfo').fkid;

    switch (song) {
        case 'qclDfyIdMDk': //Thomas the Pain Train
    $('ul.chat-main').append(`
      <li class="system">
          ${Dubtrack.room.player.activeSong.get('songInfo').fkid} ${Dubtrack.room.player.activeSong.attributes.songInfo.name} IS KNOWN EARRAPE!
      </li>`);
          break;
    }
}
