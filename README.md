<img src="https://mike-schultz.github.io/materialette/assets/banner-sm.png" alt="materialette" description="Material design">
<p align="center"> <img src="https://mike-schultz.github.io/materialette/assets/app.gif" alt="materialette" description="Material design"></p>
## Materialette

Easily access every color in [Google's material design palette](https://material.google.com/style/color.html) from your OS dock.

Made using [electron](http://electron.atom.io/).

[![Github All Releases](https://img.shields.io/github/downloads/mike-schultz/materialette/total.svg)]()

## Install
Download the latest build from the [releases](https://github.com/mike-schultz/materialette/releases) section. Make sure to choose your operating system appropriately.
### macOS
1. Unzip the Materialette.zip.
2. Move the Materialette.app file to the `/Applications` directory

### Windows 7.1+
1. Unzip to a desired location and run the exe

### Linux (Some distros)
1. Unzip to a desired location
2. open terminal
3. `cd` to the unzipped directory
4. run `./Materialette`

Note: There are some known issues with using electron + Tray with Linux.

#### Confirmed:
* **Ubuntu 16.04**
  * Requires libappindicator1. Install with `sudo apt-get install libappindicator1`.
  * Upon opening, a blank button is presented. Clicking it will load Materialette.
* **Fedora 24**
  * Requires libappindicator1. Install with `sudo dnf install libappindicator1`.

If you are able to run the app successfully in a different distro, please update this README!

## Develop

If you're using [nvm](https://github.com/creationix/nvm#nvmrc), run the command `$ nvm use` to use the version of Node specified in the
[.nvmrc](https://github.com/creationix/nvm#nvmrc).

* Install dependencies with `$ npm install` or `$ yarn`. A yarn.lock is included.
* Compile SCSS -> CSS `$ gulp sass` or `$ gulp sass:watch`
* Start the application with `$ npm start `
* Build the application with  `$ npm run build`
