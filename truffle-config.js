const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const privateKeyDev = process.env.PRIVATE_KEY;


module.exports = {
  networks: {
    // Moonbeam Development Network
    substrate_dev: {
      provider: () => {
        if (!privateKeyDev.trim()) {
          throw new Error(
              'Please enter a private key with funds, you can use the default one'
          );
        }
        return new HDWalletProvider(
            privateKeyDev,
            process.env.HOST
        );
      },
      network_id: 111121,
      // network_id: 42,
    }
  },
  compilers: {
    solc: {
      version: '^0.8.2',
    },
  },
  plugins: ['moonbeam-truffle-plugin'],
};
