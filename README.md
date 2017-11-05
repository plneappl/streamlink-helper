# Streamlink Helper

A companion addon for [Streamlink](https://github.com/streamlink/streamlink).

Listing on AMO: [Streamlink Helper](https://addons.mozilla.org/en-US/firefox/addon/streamlink_helper/).

## What it does

This add-on adds an entry to the context menu for URLs and the current page. Clicking it will launch `streamlink` with the URL/page as its first argument.
This allows you to watch livestreams, for example from twitch, with a custom media player without the hassle of inputting commands.

## Configuration

You need to do multiple things for this to work:
- Install [Python](https://python.org), and add it to your `PATH` environment variable.
- Install [Streamlink](https://github.com/streamlink/streamlink), propably using `pip install streamlink`. Add the executable to your path.
- Set `default-stream best` (or another quality) and a default `player` in the `streamlinkrc` (found on Windows at `%APPDATA%\streamlink\streamlinkrc`, on Linux at `~/.streamlinkrc`).
- Download and unzip `streamlink_helper.zip` from [Releases](https://github.com/plneappl/streamlink_helper/releases) somewhere you can read and write to. Note that location. Then:
    - **Windows**:
        + Edit `registry.reg` with the path to `streamlink_helper_windows.json` in that location and execute it, or edit the registry on your own.
        + Edit `streamlink_helper_windows.json` with the path to `streamlink_helper.bat`.
        + Edit `streamlink_helper.bat` with the path to `streamlink_helper.py` (and to Python, if it's not on your path).
        + If `streamlink.exe` is not on your path, edit `streamlink_helper.py`, replacing `streamlink.exe` with the location to it.
        + + If `streamlink.exe` IS on your path, but firefox still refuses to find it, you can find out the path to `streamlink.exe` with `where streamlink` and put that in `streamlink_helper.py`.
    - **Linux**:
        + Ensure Python is in your path. If you can call `python` from a terminal, that is propably the case.
        + Edit `streamlink_helper.json` with the path to `streamlink_helper.py`.
        + Copy `streamlink_helper.json` to the appropriate directory according to [this documentation](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Linux) (most likely you want to do `cp streamlink_helper.json ~/.mozilla/native-messaging-hosts/`).
        + If `streamlink` is not in your path, edit `streamlink_helper.py`, replacing `streamlink` with the location to it.
        + If `streamlink` IS on your path, but firefox still refuses to find it, you can find out the path to `streamlink` with `which streamlink` and put that in `streamlink_helper.py`.

## FAQ

- "This is all too complicated! Is this really neccessary? Couldn't you have made this easier?"

Yes, its way too complicated, but neccessary for FF57. Maybe I could have made it easier, but relative paths don't seem to work in all these files. If you want, you could create an installer for this ;)

- "Does this work on MacOS?"

Probably, but you have to consult [the official documentation](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging) for how to configure your equivalent of a registry, point directly to the python file instead of a bat and make it executable. YMMV.

- "Why only FF57?"

The templates ([1](https://github.com/mdn/webextensions-examples/tree/master/native-messaging/add-on), [2](https://github.com/mdn/webextensions-examples/tree/master/menu-demo)) I used to create this had some lower version limits, so I took the upper one. Since there is already a [functioning addon for FF ≤ 56](https://addons.mozilla.org/en-US/firefox/addon/open-livestreamer/), I didn't check if this addon works with lower versions.
To use [Open with Livestreamer](https://addons.mozilla.org/en-US/firefox/addon/open-livestreamer/), just set the path to "livestreamer" to the streamlink executable, and it works with streamlink.

## Invoking Streamlink from another extension
`js
browser.runtime.sendMessage("streamlink.firefox.helper@gmail.com", "https://example.com/your/url/here")
  .then(onSuccess)
  .catch(onError);
`

You can use the built-in management API to check if the extension is installed.
