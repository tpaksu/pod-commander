interface Window {
  dockerAPI: {
    listContainers: () => Promise<any[]>;
    listImages: () => Promise<any[]>;
    listVolumes: () => Promise<any[]>;
    listNetworks: () => Promise<any[]>;
  };
}
