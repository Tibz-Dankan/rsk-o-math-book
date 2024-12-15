import { ethers, upgrades } from "hardhat";

async function main() {
  const ConverterV2 = await ethers.getContractFactory("ConverterV2");
  console.log("Upgrading Converter proxy...");

  const proxyAddress = "<PROXY_CONTRACT_ADDRESS>"; // Replace with the deployed proxy address
  await upgrades.upgradeProxy(proxyAddress, ConverterV2);

  console.log("Converter proxy upgraded to V2!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
