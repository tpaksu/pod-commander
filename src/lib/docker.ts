import Dockerode from 'dockerode';
import fs from 'fs';

const socketPaths = [
  '/var/run/docker.sock', // Default Docker socket
  '/Users/taha.paksu/.rd/docker.sock', // Rancher Desktop socket
];

const availableSocketPath = socketPaths.find((path) => fs.existsSync(path));

if (!availableSocketPath) {
  throw new Error('No Docker socket found. Ensure Docker or Rancher Desktop is running.');
}

const docker = new Dockerode({ socketPath: availableSocketPath });

export default {
    listContainers: async () => {
        return docker.listContainers({ all: true });
    },
    listImages: async () => {
        return docker.listImages();
    },
    listVolumes: async () => {
        const { Volumes = [] } = await docker.listVolumes();
        return Volumes;
    },
    listNetworks: async () => {
        return docker.listNetworks();
    },
};
