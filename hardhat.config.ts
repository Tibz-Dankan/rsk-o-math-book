import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    rskMainnet: {
      url: "https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}",
      chainId: 30,
      gasPrice: 60000000,
      accounts: [process.env.ROOTSTOCK_MAINNET_PRIVATE_KEY!],
    },
    rskTestnet: {
      url: "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}",
      chainId: 31,
      gasPrice: 60000000,
      accounts: [process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY!],
    },
  },
};

export default config;
