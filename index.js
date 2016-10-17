const menubar = require('menubar')({
  width: 370,
  height: 410,
  icon: __dirname + '/assets/IconTemplate.png',
  dir: __dirname,
  alwaysOnTop: true
});
menubar.on('ready', ()=>{
  global.sharedObj = {
    hide: menubar.hideWindow,
    quit: menubar.app.quit,
    pinned: false
  }
});

menubar.on('focus-lost', () => {
  if (!global.sharedObj.pinned) {
    menubar.hideWindow();
  }
})
