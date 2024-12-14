const { ethers } = require("hardhat");

async function main() {
  const Converter = await ethers.getContractFactory("Converter");
  const converter = await Converter.deploy();

  await converter.deployed();

  console.log("Converter deployed to:", converter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
