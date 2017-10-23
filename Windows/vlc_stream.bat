set "arg=%1"
set "argp=%arg:*:=%"
cd "C:\Program Files (x86)\VideoLAN\VLC\"
start vlc --http-reconnect %argp%