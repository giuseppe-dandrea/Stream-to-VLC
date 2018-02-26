// ==UserScript==
// @name         Stream to VLC
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Opens VLC from streaming sites
// @author       mattiadr, giuseppe-dandrea
// @match        http*://openload.co/*
// @match        http*://turbovid.me/*
// @match        http*://www.flashx.to/*
// @match        http*://www.flashx.tv/*
// @match        http*://www.flashx.sx/*
// @match        http*://www.rapidvideo.com/*
// @match        http*://wstream.video/*
// @grant        window.close
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
(function() {

var url = null;

if (window.location.href.indexOf('openload.co') != -1) {
	$('#videooverlay').trigger('click');
	url = $('#olvideo_html5_api')[0].src;
}

else if (window.location.href.indexOf('turbovid.me') != -1) {
	$('html').removeClass(" js ");
	if ($('#video-content').length === 0) {
		//$('#container > h2').append("<h1 style=\"color:red;\">WAIT AND CLICK ON BUTTON</h1>");
		$('#container > h2').append("<h1 style=\"color:red;\">WAIT, THE BUTTON WILL BE PRESSED AUTOMATICALLY</h1>");
		new Promise((resolve) => setTimeout(resolve, 9000)).then(() => {
		   $('#btn_download').trigger('click');
		});
	} else {
		//$('#content > h2').append("<h1 style=\"color:red;\">CLICK ON VIDEO TO START VLC</h1>");
		wait_until_video_click();
		}
	}

else if (window.location.href.indexOf('flashx.to') != -1 || window.location.href.indexOf('flashx.tv') != -1 || window.location.href.indexOf('flashx.sx') != -1) {
	if ($('video').size() === 0) {
		$('#main > center > h2').append("<h1 style=\"color:red;\">WAIT, THE BUTTON WILL BE PRESSED AUTOMATICALLY</h1>");
		new Promise((resolve) => setTimeout(resolve, 6000)).then(() => {
			$('#btn_download').trigger('click');
		});
	} else {
		new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
			url = $('video')[0].src;
			play_url(url);
		});
	}
    if (window.location.href.indexOf('flashx.sx') != -1) {
        $('body').append("<h1 id=\"info\" style=\"color:red;padding:20px\">CLICK ON VIDEO (until the ads end) TO START VLC.</h1>");
        $("#info").append("<h1 style=\"color:lime;padding:120px;font-size:15px;\">Remember to close the tab if the video is in an iframe, because the script cannot close tabs from iframes and probably there is a MINER in the site</h1>");
        $('body > center > div > div:nth-child(2) > div.BJPPopAdsOverlay').remove();
        wait_until_video_click();
        }
}
else if (window.location.href.indexOf('rapidvideo.com') != -1) {
	url = $('video')[0].src;
}

else if (window.location.href.indexOf('wstream.video') != -1) {
	//$('#video-content > table > tbody > tr > td:nth-child(1) > h3').append("<h1 style=\"color:red;\">CLICK ON VIDEO TO START VLC</h1>");
	wait_until_video_click();
}


play_url(url);

function play_url(url) {
	if (url !== null) {
		window.open('vlcs:' + url, '_self');
        if (GM_getValue("VLC_first_time", true)) {
            alert("Please always remember choice or you will need to edit source code (see Readme for more info)");
            GM_setValue("VLC_first_time", false);
        } else {
            new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
                //Comment the next line to be able  authorize xdg-open
                window.close();
            });
        }
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
})();
