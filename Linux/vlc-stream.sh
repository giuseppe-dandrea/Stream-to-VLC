#!/bin/bash

arg=$1

if [[ $arg == vlcs:* ]]; then
	vlc --http-reconnect ${arg:5}
else
	vlc
fi
