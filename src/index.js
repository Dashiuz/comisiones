const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const processFile = require("./scripts/process_excel");
const url = require("url");
const path = require("path");

let mainWindow;

const menuTemplate = [
  {
    label: "Archivo",
    submenu: [
      // {
      //   label: "Abrir Archivo",
      //   accelerator: process.platform == "darwin" ? "command+O" : "Ctrl+O",
      //   click() {
      //     dialog.showOpenDialog({
      //       properties: ["openFile"],
      //       filters: [{ name: "excel", extensions: ["xls", "xlsx"] }],
      //     });
      //   },
      // },
      {
        label: "Salir",
        accelerator: process.platform == "darwin" ? "command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "./node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });

  menuTemplate.push({
    label: "DevTools",
    submenu: [
      {
        label: "show/hide Dev Tools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}

if (process.platform == "darwin") {
  menuTemplate.unshift({
    label: app.getName(),
  });
}

ipcMain.on("file:new", (e, fileName) => {
  const checkFile = processFile(fileName);
  mainWindow.webContents.send("data:new", checkFile);
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
    icon: path.join(__dirname, "icons/icons8-euro-96.png"),
    width: 1200,
    height: 400,
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./views/index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => {
    app.quit();
  });
});
