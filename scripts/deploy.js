const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Converter = await ethers.getContractFactory("Converter");
  const converter = await Converter.deploy();
  await converter.deploymentTransaction().wait(); 

  console.log("converter:",converter)
  console.log("converter address:", converter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
