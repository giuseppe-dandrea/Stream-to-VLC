## LINUX:

1. Add the Tampermonkey extension on chrome
2. Download the script from: https://greasyfork.org/en/scripts/34206-stream-to-vlc
3. Go to "home/.local/share/applications" and add the following line to "mimeapps.list"
x-scheme-handler/vlcs=vlc-stream.desktop
4. Open "vlc-stream" and change the [username] with the name of your user
Exec=/home/[username]/.local/share/applications/vlc-stream.sh %u
5. Copy both "vlc-stream" files to "home/.local/share/applications"
6. Enjoy your streaming on VLC

## SUPPORTED SITES:

* openload.co 	-- Fully compatible
* flash.to	-- Fully compatible
* rapidvideo.com	-- Fully compatible
* wstream.video	-- Open the site and press on the video to open VLC
* turbovid.me 	-- Open the site and press on the video to open VLC

### Troubleshooting:

If the openload tab closes before you can authorize the xdg-open, go to the script source code and add "//" at the beginning of this line: "window.close();", then authorize and remember the authorization for xdg-open and uncomment the line.
