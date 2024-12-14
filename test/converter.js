const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Converter Contract", function () {
  it("Should process input and return correct output", async function () {
    // Compile and deploy the contract
    const Converter = await ethers.getContractFactory("Converter");
    const converter = await Converter.deploy(); // Deploy the contract
    await converter.deploymentTransaction().wait(); // Ensure it's fully deployed

    // Define inputs
    const walletToCharge = "0x000000000000000000000000000000000000dEaD";
    const inputNumber = "1010";
    const inputBase = 2;
    const outputBase = 10;

    // Call the contract function
    const result = await converter.processConversion(
      walletToCharge,
      inputNumber,
      inputBase,
      outputBase
    );

    console.log("result:", result);

    // Validate outputs
    expect(result[0]).to.equal(walletToCharge);
    expect(result[1]).to.equal(inputNumber);
    expect(result[2]).to.equal(inputBase);
    expect(result[3]).to.equal(outputBase);
    expect(result[4]).to.equal("10"); // Binary 1010 is decimal 10
    expect(result[5]).to.equal("a"); // Decimal 10 is hexadecimal "a"
  });
});
