const electron = require('electron');
const menubar = require('menubar')({
  width: 370,
  height: 410,
  icon: __dirname + '/assets/IconTemplate.png',
  dir: __dirname,
  alwaysOnTop: true,
  tooltip: "Materialette",
  resizable: false
});

const contextMenu = electron.Menu.buildFromTemplate([
  {
    label: 'About',
    click() {
      electron.dialog.showMessageBox({title: "Materialette", type:"info", message: "Material Color Palette for macOS, Windows, and Linux", buttons: ["Close"] });
    }
  },
  {
    label: 'Website',
    click() {
      electron.shell.openExternal("https://github.com/mike-schultz/materialette");
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    click() {
      menubar.app.quit();
    }
  }

]);

menubar.on('ready', ()=>{
  global.sharedObj = {
    hide: menubar.hideWindow,
    quit: menubar.app.quit,
    pinned: false
  }
  
  // This will add a context menu on the 
  // app icon on right click for Windows
  if (process.platform == 'win32') {
    menubar.tray.setContextMenu(contextMenu);
  }
});

menubar.on('focus-lost', () => {
  if (!global.sharedObj.pinned) {
    menubar.hideWindow();
  }
})
