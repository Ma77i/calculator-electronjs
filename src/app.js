const { app, BrowserWindow, Menu } = require("electron");

const URL = require("url");
const path = require("path");

const debug = /--debug/.test(process.argv[2])

let mainWindow;

const createWindow = () => {
  const windowOptions = {
    width: 500,
    height: 550,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // resizable: false,
    // icon: path.join(__dirname, "assets/icons/png/64x64.png"),
    title: "Calculator Electron",
  }

  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.loadURL(
    URL.format({
      pathname: path.join(__dirname, "views/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // creamos una variable para guardar el menu creado desde un template
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  // y lo asignamos a nuestro navegador
  Menu.setApplicationMenu(mainMenu);
  // cerramos todas las ventanas cuando el usuario cierra la aplicacion

  // Launch fullscreen with DevTools open, usage: npm run debug
  if (debug) {
    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
    require('devtron').install()
  }

  mainWindow.on("closed", () => {
    app.quit();
  });
}

app.on("ready", () => {
  createWindow();
});

const templateMenu = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        onclick: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        role: "undo",
      },
      {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        role: "redo",
      },
    ]
  },
  {
    label: "Help",
    submenu: [
      {
        label: "About",
        click: () => {
          console.log("About");
        }
      },
      {
        label: "Contact",
        click: () => {
          console.log("Contact");
        }
      }
    ]
  }
];

if (process.env.NODE_ENV !== "production") {
  templateMenu.push({
    label: "DevTools",
    submenu: [
      {
        label: "Reload",
        accelerator: "Ctrl + R",
        click: () => {
          mainWindow.reload();
        }
      },
      {
        label: "Toggle DevTools",
        accelerator: "Ctrl + D",
        click: (item, focusedWindow) => {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  })
}