import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Converter = await ethers.getContractFactory("Converter");
  const converter = await Converter.deploy();
  await converter.waitForDeployment();

  const contractAddress = await converter.getAddress();
  console.log("contractAddress:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
