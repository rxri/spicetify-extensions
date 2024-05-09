# Writeify

Take notes on songs with `Writeify` for **[spicetify](https://github.com/spicetify/spicetify-cli)**

* Right click any song or click it's note in the note column of the albums to write a note, remember to hit save!

## Install

1. Copy `writeify.js` to extensions folder based on your OS, or install it via **[marketplace](https://github.com/spicetify/spicetify-marketplace)**

| **Platform**   | **Path**                                                                             |
|----------------|--------------------------------------------------------------------------------------|
| **Windows**    | `%appdata%\spicetify\Extensions\`                                                    |
| **Linux**      | `~/.config/spicetify/Extensions` or `$XDG_CONFIG_HOME/.config/spicetify/Extensions/` |
| **MacOS**      | `~/.config/spicetify/Extensions` or `~/.spicetify/Extensions`                        |

After putting the extension file into the correct folder, run the following command to install the extension or install through marketplace:

```sh
spicetify config extensions writeify.js
spicetify apply
```

Note: Using the `config` command to add the extension will always append the file name to the existing extensions list. It does not replace the whole key's value.

Or you can manually edit your `config-xpui.ini` file. Add your desired extension filenames in the extensions key, separated them by the | character.
Example:

```ini
[AdditionalOptions]
...
extensions = autoSkipExplicit.js|shuffle+.js|trashbin.js|writeify.js
```

Then run:

```sh
spicetify apply
```

## Usage

Toggle in the Profile menu.

![Screenshot](https://raw.githubusercontent.com/rxri/spicetify-extensions/main/writeify/writeify.png)

-----
If you find any bugs, please [create a new issue](https://github.com/rxri/spicetify-extensions/issues/new/choose) on the GitHub repo.
![https://github.com/rxri/spicetify-extensions/issues](https://img.shields.io/github/issues/rxri/spicetify-extensions?logo=github)
