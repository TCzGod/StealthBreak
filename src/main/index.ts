import { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage } from 'electron';
import { ProcessMonitor } from './monitor';
import { ScreenSwitcher } from './screenSwitcher';
import { BehaviorEngine } from '../core/behaviorEngine';
import path from 'path';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let processMonitor: ProcessMonitor;
let screenSwitcher: ScreenSwitcher;
let behaviorEngine: BehaviorEngine;
let isStealthMode = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    title: 'StealthBreak',
    frame: true,
    resizable: true
  });

  mainWindow.loadURL('http://localhost:5173');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  const iconPath = path.join(__dirname, '../../assets/icon.png');
  const icon = nativeImage.createFromPath(iconPath);
  
  tray = new Tray(icon);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        }
      }
    },
    {
      label: '开启隐身模式',
      type: 'checkbox',
      checked: isStealthMode,
      click: (menuItem) => {
        toggleStealthMode(menuItem.checked);
      }
    },
    {
      label: '设置',
      click: () => {
        // 打开设置窗口
      }
    },
    {
      label: '退出',
      click: () => {
        app.quit();
      }
    }
  ]);
  
  tray.setToolTip('StealthBreak - 智能职场辅助系统');
  tray.setContextMenu(contextMenu);
  
  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

function toggleStealthMode(enabled: boolean) {
  isStealthMode = enabled;
  
  if (enabled) {
    behaviorEngine.start();
  } else {
    behaviorEngine.stop();
  }
  
  // 更新托盘菜单
  if (tray) {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '显示主窗口',
        click: () => {
          if (mainWindow) {
            mainWindow.show();
          }
        }
      },
      {
        label: '开启隐身模式',
        type: 'checkbox',
        checked: isStealthMode,
        click: (menuItem) => {
          toggleStealthMode(menuItem.checked);
        }
      },
      {
        label: '设置',
        click: () => {
          // 打开设置窗口
        }
      },
      {
        label: '退出',
        click: () => {
          app.quit();
        }
      }
    ]);
    tray.setContextMenu(contextMenu);
  }
  
  // 通知渲染进程
  if (mainWindow) {
    mainWindow.webContents.send('stealth-mode-changed', enabled);
  }
}

function initializeServices() {
  processMonitor = new ProcessMonitor();
  screenSwitcher = new ScreenSwitcher();
  behaviorEngine = new BehaviorEngine({
    mouseSpeed: 10,
    keyboardDelay: [50, 300],
    pauseProbability: 0.3,
    pauseDuration: [500, 2000]
  });
  
  // 添加默认安全应用
  screenSwitcher.addSafeApplication({
    name: 'Excel',
    path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE',
    shortcut: 'excel'
  });
  
  screenSwitcher.addSafeApplication({
    name: 'Visual Studio Code',
    path: 'C:\\Users\\zilu.zhu\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe',
    shortcut: 'code'
  });
  
  // 监控进程
  processMonitor.setOnMonitorDetected((processName) => {
    console.log(`检测到监控程序: ${processName}`);
    if (!isStealthMode) {
      toggleStealthMode(true);
    }
    screenSwitcher.switchToSafeApplication();
  });
  
  processMonitor.startMonitoring();
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  initializeServices();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC事件处理
ipcMain.on('get-monitoring-status', (event) => {
  processMonitor.checkProcesses().then((processes) => {
    event.reply('monitoring-status', processes);
  });
});

ipcMain.on('toggle-stealth-mode', (event, enabled) => {
  toggleStealthMode(enabled);
  event.reply('stealth-mode-changed', enabled);
});

ipcMain.on('get-safe-applications', (event) => {
  event.reply('safe-applications', screenSwitcher.getSafeApplications());
});

ipcMain.on('add-safe-application', (event, app) => {
  screenSwitcher.addSafeApplication(app);
  event.reply('safe-applications-updated', screenSwitcher.getSafeApplications());
});

ipcMain.on('remove-safe-application', (event, appName) => {
  screenSwitcher.removeSafeApplication(appName);
  event.reply('safe-applications-updated', screenSwitcher.getSafeApplications());
});