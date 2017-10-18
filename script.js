// ==UserScript==
// @name         Openload to VLC(recursion)
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Opens VLC from Openload stream
// @author       mattiadr
// @match        http*://openload.co/*
// @match        http*://turbovid.me/*
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
        new Promise((resolve) => setTimeout(resolve, 9000)).then(() => {
            $('#btn_download').trigger('click');
        });
    } else {
        wait_until_turbovid_click();
        }
    }

if (url !== null) {
    window.open('vlcs:' + url, '_self');
    new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
        window.close();
    });
}

function wait_until_turbovid_click() {
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        if ($('video')[0].src.indexOf('http') != -1) {
            url = $('video')[0].src;
            window.open('vlcs:' + url, '_self');
            new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
                window.close();
    });
        } else {
              wait_until_turbovid_click();
        }
        });
}