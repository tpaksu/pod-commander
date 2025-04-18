import { contextBridge, ipcRenderer } from 'electron';

// Expose Docker API methods to the renderer process
contextBridge.exposeInMainWorld('dockerAPI', {
  listContainers: () => ipcRenderer.invoke('docker:listContainers'),
  listImages: () => ipcRenderer.invoke('docker:listImages'),
  listVolumes: () => ipcRenderer.invoke('docker:listVolumes'),
  listNetworks: () => ipcRenderer.invoke('docker:listNetworks')
});
