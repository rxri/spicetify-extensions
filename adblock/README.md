# adblockify

Stream Spotify music without interruptions - Block ads instantly, with ease.

> [!NOTE]
> Premium features include:
> - No forced shuffle
> - No forced repeat
> - Modifiable queue
> - No ads between songs and in the UI
> - No upsell popups about premium or popup ads

> [!CAUTION]
> This extension **won't**:
> - Unlock native lyrics page
> - Let you download songs
> - Allow to change song quality to `Very High`
> - Allow you to listen with friends in Jams

## Install

1. Copy `adblock.js` to extensions folder based on your OS or install it via **[marketplace](https://github.com/spicetify/spicetify-marketplace)**

| **Platform**   | **Path**                                                                             |
|----------------|--------------------------------------------------------------------------------------|
| **Windows**    | `%appdata%\spicetify\Extensions\`                                                    |
| **Linux**      | `~/.config/spicetify/Extensions` or `$XDG_CONFIG_HOME/spicetify/Extensions/`         |
| **MacOS**      | `~/.config/spicetify/Extensions` or `~/.spicetify/Extensions`                        |

After putting the extension file into the correct folder, run the following command to install the extension or install through marketplace:

```sh
spicetify config extensions adblock.js
spicetify apply
```

Note: Using the `config` command to add the extension will always append the file name to the existing extensions list. It does not replace the whole key's value.

Or you can manually edit your `config-xpui.ini` file. Add your desired extension filenames in the extensions key, separated them by the | character.
Example:

```ini
[AdditionalOptions]
...
extensions = autoSkipExplicit.js|shuffle+.js|trashbin.js|adblock.js
```

Then run:

```sh
spicetify apply
```

-----
If you find any bugs, please [create a new issue](https://github.com/rxri/spicetify-extensions/issues/new/choose) on the GitHub repo.
![https://github.com/rxri/spicetify-extensions/issues](https://img.shields.io/github/issues/rxri/spicetify-extensions?logo=github)
