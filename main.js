'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window to be full screen. Could also be kiosk: true
  // but requires some further testing.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
//    fullscreen: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  
  // Don't show a menu bar
  mainWindow.setMenuBarVisibility(false);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

const saveResults = formData => {
  console.log('save form');
  console.log(formData);
  
  var fs = require('fs');
  var stream = fs.createWriteStream("entries.txt", {'flags': 'a'});
  stream.once('open', function(fd) {
    stream.write(formData.name + "\n");
    stream.write(formData.email + "\n");
    
    for (let i = 0; i < formData.interests.length; i++) {
      stream.write(formData.interests[0] + "\n");
    }
    
    stream.write("\n----------------------------------------\n\n")
    stream.end();
  });
}

exports.saveResults = saveResults;
