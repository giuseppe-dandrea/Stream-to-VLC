# Stream to VLC

![alt text](https://github.com/giuseppe-dandrea/Stream-to-VLC/blob/master/img/StreamToVLC.gif "screen1")

**Table of Contents**

- [Installation](#installation)
	- [LINUX](#linux)
	- [WINDOWS](#windows)
- [Supported Sites](#supported-sites)
- [Troubleshooting](#troubleshooting)

## Installation

### LINUX:

1. Add the Tampermonkey extension on your browser
2. Download the script from: <https://greasyfork.org/en/scripts/34206-stream-to-vlc>
3. Go to "home/.local/share/applications" and add the following line to "mimeinfo.cache"
> x-scheme-handler/vlcs=vlc-stream.desktop;
4. Open "vlc-stream.desktop" and change the [username] with the name of your user
> Exec=/home/[username]/.local/share/applications/vlc-stream.sh %u
5. Copy both "vlc-stream" files to "home/.local/share/applications"
6. The first time you open a streaming site you have to "always remember" choice (if you didn't go see Troubleshooting)
7. Enjoy your streaming on VLC

### WINDOWS:

1. Add the Tampermonkey extension on your browser
2. Download the script from: <https://greasyfork.org/en/scripts/34206-stream-to-vlc>
3. Type "regedit" in the "Run..." command (Windows logo key+R)
4. Add a "vlcs" key to "HKEY_CLASSES_ROOT" and add a new empty string value "URL Protocol"
5. Add three new  keys "shell", "open" and "command" (See the figures if you have problems) 
6. Change the Default string value of "command" with the path ["C:\Program Files (x86)\StreamToVLC\vlc_stream.bat" "%1"] (Copy also the quotes)
7. Now copy "vlc_stream.bat" in the path you wrote at the previous step (You have to create the new "StreamToVLC" folder)
8. The first time you open a streaming site you have to "always remember" choice (if you didn't go see Troubleshooting)
9. Done! 

NB. If the script doesn't work check that the VLC path in the .bat file is the same of your computer. 
![alt text](https://github.com/giuseppe-dandrea/Stream-to-VLC/blob/master/img/screen1.png "screen1")
![alt text](https://github.com/giuseppe-dandrea/Stream-to-VLC/blob/master/img/screen2.png "screen2")

## Supported Sites:

* openload.co		-- Fully compatible
* openloads.co		-- Fully compatible
* oload.download	-- Fully compatible
* turbovid.me		-- Fully compatible
* flashx.to/tv/sx	-- Open the site and press on the video to open VLC
* rapidvideo.com	-- Fully compatible
* wstream.video		-- Fully compatible
* video.mediaset.it	-- Fully compatible
* speedvideo.net	-- Fully compatible
* mp4upload.com		-- Fully compatible

### Troubleshooting

If you didn't set "always remember" you have to go to the script source code (you can find it in the Tampermonkey dashboard) and add "//" at the beginning of this line: "window.close();" (row 88), then authorize and remember the authorization to open VLC and uncomment the line.

Rapidvideo:
If the script on rapidvideo works only the first time you open the site, you have to disable your Adblocker on rapidvideo in order to make it works
