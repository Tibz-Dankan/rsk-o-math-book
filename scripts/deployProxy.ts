import { ethers, upgrades } from "hardhat";

async function main() {
  const Converter = await ethers.getContractFactory("Converter");
  console.log("Deploying Converter proxy...");

  // Deploy the proxy with UUPS upgradeability
  const proxy = await upgrades.deployProxy(Converter, [], { kind: "uups" });
  // console.log("Proxy deployment result:", proxy);
  console.log("Proxy deployment result:", proxy);
  // const converter = await Converter.deploy();

  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  console.log("proxyAddress:", proxyAddress);

  console.log("Converter proxy deployed to:", proxy.address);

  // const Converter = await ethers.getContractFactory('Converter');
  // const ERC1967Proxy = await ethers.getContractFactory('ERC1967Proxy');

  // const impl = await Converter.deploy();
  // await impl.waitForDeployment();
  // const proxy = await ERC1967Proxy.deploy(
  //   await impl.getAddress(),
  //   Converter.interface.encodeFunctionData('initialize', ['Add your initializer arguments here']),
  // );
  // await proxy.waitForDeployment();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
