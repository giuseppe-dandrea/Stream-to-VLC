#!/bin/bash

arg=$1

if [[ $arg == vlcs:* ]]; then
	vlc --fullscreen --http-reconnect ${arg:5}
else
	vlc
fi
