#!/bin/bash

arg=$1

if [[ $arg == vlcs:* ]]; then
	vlc ${arg:5}
else
	vlc
fi
