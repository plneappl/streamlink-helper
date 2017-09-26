# Streamlink Firefox Helper

A companion addon for [Streamlink](https://github.com/streamlink/streamlink).

## What it does

This add-on adds an entry to the context menu for URLs and the current page. Clicking it will launch ```streamlink.exe``` with the URL/page as its first argument.
This allows you to watch livestreams, for example from twitch, with a custom media player without the hassle of inputting commands.

## Configuration

You need to do multiple things for this to work:
- Install [Python](https://python.org), and add it to your ```PATH``` environment variable.
- Install [Streamlink](https://github.com/streamlink/streamlink), propably using ```pip install streamlink```. Add the executable to your path.
- Set ```default-stream best``` (or another quality) in the ```streamlinkrc``` (```found at %APPDATA%\streamlink\streamlinkrc```)
- Download and unzip ```streamlink-firefox-helper.zip``` from [Releases](https://github.com/plneappl/streamlink-firefox-helper/releases) somewhere you can read and write to. Note that location. Then:
    + Edit ```registry.reg``` with the path to ```streamlink-firefox-helper.json``` in that location and execute it, or edit the registry on your own.
    + Edit ```streamlink-firefox-helper.json``` with the path to ```streamlink-firefox-helper.bat```.
    + Edit ```streamlink-firefox-helper.bat``` with the path to ```streamlink-firefox-helper.py``` (and to Python, if it's not on your path).
    + If ```streamlink.exe``` is not on your path, edit ```streamlink-firefox-helper.py```, replacing ```streamlink.exe``` with the location to it.

## FAQ

- "This is all too complicated! Is this really neccessary? Couldn't you have made this easier?"

Yes, its way too complicated, but neccessary for FF57. Maybe I could have made it easier, but relative paths don't seem to work in all these files. If you want, you could create an installer for this ;)

- "Does this work on Linux/MacOS?"

Propably, but you have to consult [the official documentation](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging) for how to configure your equivalent of a registry, remove the ```.exe```-part from the python file, point directly to the python file instead of a bat and make it executable. YMMV.
