const { app, BrowserWindow, Menu, shell } = require("electron");

const URL = require("url");
const path = require("path");

let mainWindow;

const createWindow = () => {
  const windowOptions = {
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false,
    icon: path.join(__dirname, "./pic.png"),
    title: "Calculator Electron",
  };

  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.loadURL(
    URL.format({
      pathname: path.join(__dirname, "views/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(templateMenu);
  // y lo asignamos a nuestro navegador
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => {
    app.quit();
  });
};

app.on("ready", () => {
  createWindow();
});

const templateMenu = [
  {
    label: "Edit",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform === "darwin" ? "Cmd + D" : "Ctrl + D",
        click: (item, focusedWindow) => {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  },
  {
    label: "Window",
    role: "window",
    submenu: [
      {
        label: "Reload",
        accelerator: process.platform === "darwin" ? "Cmd + R" : "Ctrl + R",
        click: () => {
          mainWindow.reload();
        },
      },
      {
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        role: "minimize",
      },
      {
        label: "Close",
        accelerator: "CmdOrCtrl+W",
        role: "close",
      },
      {
        type: "separator",
      },
      {
        label: "Reopen Window",
        accelerator: "CmdOrCtrl+Shift+T",
        enabled: false,
        key: "reopenMenuItem",
        click: () => {
          app.emit("activate");
        },
      },
    ],
  },
  {
    label: "Help",
    role: "help",
    submenu: [
      {
        label: "Visit GitHub repository",
        click: () => {
          shell.openExternal(
            "http://www.github.com/Ma77i/calculator-electronjs"
          );
        },
      },
    ],
  },
];
