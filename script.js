// ==UserScript==
// @name         Openload to VLC(recursion)
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Opens VLC from Openload stream
// @author       mattiadr
// @match        http*://openload.co/*
// @match        http*://turbovid.me/*
// @match        http*://www.flashx.to/*
// @match        http*://www.rapidvideo.com/*
// @match        http*://wstream.video/*
// @grant        window.close
// ==/UserScript==

var url = null;

if (window.location.href.indexOf('openload.co') != -1) {
    $('#videooverlay').trigger('click');
    url = $('#olvideo_html5_api')[0].src;
}

else if (window.location.href.indexOf('turbovid.me') != -1) {
    $('html').removeClass(" js ");
    if ($('#video-content').size() === 0) {
        $('#container > h2').append("<h1 style=\"color:red;\">ATTENDI E CLICCA SUL BOTTONE</h1>");
        //new Promise((resolve) => setTimeout(resolve, 9000)).then(() => {
        //    $('#btn_download').trigger('click');
        //});
    } else {
        $('#content > h2').append("<h1 style=\"color:red;\">CLICCARE SUL VIDEO PER FAR PARTIRE VLC</h1>");
        wait_until_video_click();
        }
    }

else if (window.location.href.indexOf('flashx.to') != -1) {
    if ($('video').size() === 0) {
        $('#main > center > h2').append("<h1 style=\"color:red;\">ATTENDI, IL PULSANTE VERRA' PREMUTO AL POSTO TUO</h1>");
        new Promise((resolve) => setTimeout(resolve, 6000)).then(() => {
            $('#btn_download').trigger('click');
        });
    } else {
        new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
            url = $('video')[0].src;
            play_url(url);
        });
    }
}
else if (window.location.href.indexOf('rapidvideo.com') != -1) {
    url = $('video')[0].src;
}

else if (window.location.href.indexOf('wstream.video') != -1) {
    $('#video-content > table > tbody > tr > td:nth-child(1) > h3').append("<h1 style=\"color:red;\">CLICCARE SUL VIDEO PER FAR PARTIRE VLC</h1>");
    wait_until_video_click();
}


play_url(url);

function play_url(url) {
    if (url !== null) {
        window.open('vlcs:' + url, '_self');
        new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
            //Comment the next line to be able  authorize xdg-open
            window.close();
        });
    }
}

function wait_until_video_click() {
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        if ($('video')[0].src.indexOf('http') != -1) {
            url = $('video')[0].src;
            play_url(url);
        } else {
              wait_until_video_click();
        }
        });
}
