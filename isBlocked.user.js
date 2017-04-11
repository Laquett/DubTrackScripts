setTimeout(function(){
    blocked(null);
    Dubtrack.Events.bind('realtime:room_playlist-update', blocked);
}, 5000);
function blocked(e) {
    if (e === null) {
        e = {
            songInfo: {
                fkid: Dubtrack.room.player.activeSong.get('songInfo').fkid,
                name: Dubtrack.room.player.activeSong.get('songInfo').name,
                startTime: 1
            }
        };
    }
    if (e.startTime < 2) {
        Dubtrack.helpers.sendRequest('https://mitchdev.net/api/v2/yt/'+e.songInfo.fkid, {}, 'get', function(err, res) {
            console.log('[Dubtrack] isBlocked:\n',res);
            if (err) console.error('[Dubtrack] isBlocked:\n',err);
            if (res.status) console.error('[Dubtrack] isBlocked: '+e.songInfo.fkid+': 404');
            if (res.blocked && res.blocked !== null) {
                Dubtrack.room.chat.mentionChatSound.play();
                sendChat(e, res.blocked, 'blocked');
            }
            if (res.allowed && res.allowed !== null) {
                Dubtrack.room.chat.mentionChatSound.play();
                sendChat(e, res.allowed, 'allowed');
            }
        });
    }
}
function sendChat(e, countries, type) {
    scroll();
    if (countries.length == 1) {
        $('.chat-main').append('<li class="system" style="padding-right: 15px !important;"><a target="_blank" href="https://mitchdev.net/yt?id='+e.songInfo.fkid+'">'+e.songInfo.name+'<br>has 1 country '+type+''+main(countries)+'</a></li>');
        return;
    }
    $('.chat-main').append('<li class="system" style="padding-right: 15px !important;"><a target="_blank" href="https://mitchdev.net/yt?id='+e.songInfo.fkid+'">'+e.songInfo.name+'<br>has '+countries.length+' countries '+type+''+main(countries)+'</a></li>');
}
function scroll() {
    if (parseInt($('.chat-messages .ps-scrollbar-y-rail').height()) - parseInt($('.chat-messages .ps-scrollbar-y-rail .ps-scrollbar-y').height()) == parseInt($('.chat-messages .ps-scrollbar-y-rail .ps-scrollbar-y').css('top'))) {
        setTimeout(function() {
            $('#new-messages-counter').click();
        }, 500);
    } else {
    }
}
function main(countries) {
    var mc = null;
    var mcl = {
        US: 'United States, ',
        CA: 'Canada, ',
        UK: 'United Kingdom, ',
        GB: 'Great Britain, ',
        CN: 'China, ',
        JP: 'Japan, ',
        AU: 'Australia, ',
        NZ: 'New Zealand, ',
        MX: 'Mexico, ',
        BR: 'Brazil, ',
        RU: 'Russia, ',
        KR: 'South Korea, '
    }
    countries.forEach(function(country) {
        if (mcl[country]) {
            if (mc) {
                mc += mcl[country];
            } else {
                mc = mcl[country];
            }
        }
    });
    if (mc) {
        mc = mc.substr(0, mc.length-2);
        return ' including<br>'+mc
    }
    return '';   
}
