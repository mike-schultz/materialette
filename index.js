const electron = require('electron');
const { Tray, BrowserWindow, app } = electron;

// App Variables
const App = {
  name: 'Materialette',
  width: 370,
  height: 410,
  icon: __dirname + '/assets/IconTemplate.png',
  entry: __dirname + '/index.html'
};

const contextMenu = electron.Menu.buildFromTemplate([{
  label: 'About',
  click() {
    electron.dialog.showMessageBox({
      title: "Materialette",
      type: "info",
      message: "Material Color Palette for macOS, Windows, and Linux",
      buttons: ["Close"]
    });
  }
}, {
  label: 'Website',
  click() {
    electron.shell.openExternal("https://github.com/mike-schultz/materialette");
  }
}, {
  type: 'separator'
}, {
  label: 'Quit',
  click() {
    app.quit();
  }
}]);

let _tray;
let _window;

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function createWindow() {
  if (app.dock) {
    app.dock.hide()
  }
  // Tray
  _tray = new Tray(App.icon);
  _tray.setToolTip(App.name);
  // This will add a context menu on the
  // app icon on right click for Windows
  if (process.platform == 'win32') {
    _tray.setContextMenu(contextMenu);
  }

  // Tray Events
  _tray.on('click', toggleWindow);
  _tray.on('double-click', toggleWindow);

  // Window
  _window = new BrowserWindow({
    width: App.width,
    height: App.height,
    show: false,
    frame: false,
    alwaysOnTop: true
  });

  //Global shared object
  global.sharedObj = {
    hide: () => {
      _window.hide()
    },
    quit: app.quit,
    pinned: false
  };

  // Window Events
  _window.on('show', () => {
    _tray.setHighlightMode('always');
  });
  _window.on('hide', () => {
    _tray.setHighlightMode('never');
  });

  _window.on('blur', () => {
    if (!global.sharedObj.pinned) {
      _window.hide();
    }
  });

  _window.loadURL(`file://${App.entry}`);
  _window.on('closed', () => {
    delete _window;
  });
}


function toggleWindow() {
  moveWindow();
  _window.isVisible() ? _window.hide() : _window.show();
}

function moveWindow() {

  // Determine orientation.
  let orientation = 'top-right';
  let x = 0;
  let y = 0;

  const screen = (electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint())).bounds;
  const trayBounds = _tray.getBounds();

  // Orientation is either not on top or OS is windows.
  if (process.platform === 'win32') {
    if (trayBounds.y > screen.height / 2) {
      orientation = (trayBounds.x > screen.width / 2) ? 'bottom-right' : 'bottom-left';
    } else {
      orientation = (trayBounds.x > screen.width / 2) ? 'top-right' : 'top-left';
    }
  } else if (process.platform === 'darwin') {
    orientation = 'top';
  }

  switch (orientation) {
    case 'top':
      x = Math.floor(trayBounds.x - App.width / 2 + trayBounds.width / 2);
      y = trayBounds.y + trayBounds.height;
      break;
    case 'top-right':
      x = screen.width - App.width;
      break;
    case 'bottom-left':
      y = screen.height - App.height;
      break;
    case 'bottom-right':
      y = screen.height - App.height;
      x = screen.width - App.width;
      break;
    case 'top-left':
    default:
      x = 0;
      y = 0;
  }

  // Normalize any out of bounds
  // maxX accounts for multi-screen setups where x is the coordinate across multiple screens.
  const maxX = screen.width + screen.x;
   x = (x > maxX ) ? maxX - App.width : (x < 0) ? 0 : x;
   y = (y > screen.height) ? screen.height - App.height : (y < 0) ? 0 : y;
  _window.setPosition(x, y);
}
