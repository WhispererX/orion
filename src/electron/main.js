// Core Electron imports
import { app, BrowserWindow, ipcMain, nativeImage } from 'electron';

// Node.js built-in modules
import path from 'path';

// Application constants
const DIST_REACT_PATH = '/dist-react/index.html';
const DEVELOPMENT_PORT = 5123;
const DEFAULT_WINDOW_WIDTH = 800;
const DEFAULT_WINDOW_HEIGHT = 600;

// Environment and path configurations
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const APP_PATH = app.getAppPath();
const ICON_PATH = path.join(APP_PATH, 'icon.png');

// Application state
let mainWindow = null;

/**
 * Creates the main application window with appropriate settings for development and production
 */
const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: DEFAULT_WINDOW_WIDTH,
		height: DEFAULT_WINDOW_HEIGHT,
		icon: ICON_PATH,
		webPreferences: {
			preload: path.join(APP_PATH, 'src', 'electron', 'preload.js'),
			webSecurity: !IS_DEVELOPMENT,
		},

		frame: false,
		resizable: true,
		movable: true,
		backgroundColor: '#222222',
	});

	if (IS_DEVELOPMENT) {
		mainWindow.loadURL(`http://localhost:${DEVELOPMENT_PORT}`);
	} else {
		mainWindow.loadFile(path.join(app.getAppPath() + DIST_REACT_PATH));
	}
};

/**
 * Initializes the application when ready
 */
function initializeApp() {
	createWindow();

	const icon = nativeImage.createFromPath(ICON_PATH);

	if (process.platform === 'darwin') {
		app.dock.setIcon(icon);
	}

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
}

// Application event handlers
app.whenReady().then(initializeApp);

/**
 * Handles the window-all-closed event
 * On macOS, applications typically stay active until the user quits explicitly with Cmd + Q
 */
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

//#region IPC Handlers

//#region Window Controls
ipcMain.on('window:minimize', () => {
	if (mainWindow) {
		mainWindow.minimize();
	}
});

ipcMain.on('window:maximize', () => {
	if (mainWindow) {
		mainWindow.maximize();
	}
});

ipcMain.on('window:restore', () => {
	if (mainWindow) {
		if (mainWindow.isMaximized()) {
			mainWindow.unmaximize();
		} else {
			mainWindow.maximize();
		}
	}
});

ipcMain.on('window:close', () => {
	if (mainWindow) {
		mainWindow.close();
	}
});
//#endregion

//#endregion