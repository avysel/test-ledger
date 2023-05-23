import config from './config.json';

const getDefaultNetwork = () => {
    return config.networks.find(network => network.default === true);
}

export { getDefaultNetwork};