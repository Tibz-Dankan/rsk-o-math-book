import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    rskMainnet: {
      url: `https://rpc.mainnet.rootstock.io/${process.env.ROOTSTOCK_API_KEY}`,
      chainId: 30,
      gasPrice: 20000000,
      accounts: [process.env.ROOTSTOCK_MAINNET_PRIVATE_KEY!],
    },
    rskTestnet: {
      url: `https://rpc.testnet.rootstock.io/${process.env.ROOTSTOCK_API_KEY}`,
      chainId: 31,
      gasPrice: 20000000,
      accounts: [process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY!],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
