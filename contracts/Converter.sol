// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Converter is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    // Initialize the contract (replaces constructor)
  function initialize() public initializer {
    __Ownable_init(msg.sender);  // Set the deployer as the initial owner
    __UUPSUpgradeable_init();    // Initialize the UUPS upgradeable proxy
}

    // Authorize upgrades (only owner can upgrade)
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function processConversion(
        address walletToCharge,
        string memory inputNumber,
        uint8 inputBase,
        uint8 outputBase
    )
        public
        pure
        returns (
            address,
            string memory,
            uint8,
            uint8,
            string memory,
            string memory
        )
    {
        // Convert inputNumber from inputBase to decimal (base 10)
        uint256 decimalValue = parseToDecimal(inputNumber, inputBase);

        // Convert decimal to outputBase as a string
        string memory outputNumber = convertFromDecimal(decimalValue, outputBase);

        // Convert decimal to hexadecimal (base 16) as a string
        string memory outputHexadecimal = convertFromDecimal(decimalValue, 16);

        // Return the response
        return (
            walletToCharge,
            inputNumber,
            inputBase,
            outputBase,
            outputNumber,
            outputHexadecimal
        );
    }

    function parseToDecimal(string memory number, uint8 base) internal pure returns (uint256) {
        bytes memory numberBytes = bytes(number);
        uint256 result = 0;
        uint256 length = numberBytes.length;

        for (uint256 i = 0; i < length; i++) {
            uint8 digit = uint8(numberBytes[i]);

            // Handle characters 0-9
            if (digit >= 48 && digit <= 57) {
                digit -= 48;
            } 
            // Handle characters A-F
            else if (digit >= 65 && digit <= 70) {
                digit -= 55;
            } 
            // Handle characters a-f
            else if (digit >= 97 && digit <= 102) {
                digit -= 87;
            } else {
                revert("Invalid character in input");
            }

            require(digit < base, "Digit out of range for base");

            result = result * base + digit;
        }

        return result;
    }

    function convertFromDecimal(uint256 decimal, uint8 base) internal pure returns (string memory) {
        if (decimal == 0) {
            return "0";
        }

        bytes memory result = new bytes(64); // Temporary buffer for result
        uint256 index = 0;

        while (decimal > 0) {
            uint8 digit = uint8(decimal % base);
            decimal /= base;

            // Convert digit to ASCII
            result[index++] = digit < 10
                ? bytes1(digit + 48)  // 0-9
                : bytes1(digit + 87); // a-f
        }

        // Reverse the result
        bytes memory finalResult = new bytes(index);
        for (uint256 i = 0; i < index; i++) {
            finalResult[i] = result[index - i - 1];
        }

        return string(finalResult);
    }
}
