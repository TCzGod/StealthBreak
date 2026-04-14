const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getMonitoringStatus: () => {
    return new Promise((resolve) => {
      ipcRenderer.once('monitoring-status', (event, status) => {
        resolve(status);
      });
      ipcRenderer.send('get-monitoring-status');
    });
  },
  toggleStealthMode: (enabled) => {
    return new Promise((resolve) => {
      ipcRenderer.once('stealth-mode-changed', (event, status) => {
        resolve(status);
      });
      ipcRenderer.send('toggle-stealth-mode', enabled);
    });
  },
  getSafeApplications: () => {
    return new Promise((resolve) => {
      ipcRenderer.once('safe-applications', (event, apps) => {
        resolve(apps);
      });
      ipcRenderer.send('get-safe-applications');
    });
  },
  addSafeApplication: (app) => {
    return new Promise((resolve) => {
      ipcRenderer.once('safe-applications-updated', (event, apps) => {
        resolve(apps);
      });
      ipcRenderer.send('add-safe-application', app);
    });
  },
  removeSafeApplication: (appName) => {
    return new Promise((resolve) => {
      ipcRenderer.once('safe-applications-updated', (event, apps) => {
        resolve(apps);
      });
      ipcRenderer.send('remove-safe-application', appName);
    });
  },
  onStealthModeChanged: (callback) => {
    ipcRenderer.on('stealth-mode-changed', (event, status) => {
      callback(status);
    });
  }
});