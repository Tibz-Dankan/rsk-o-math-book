# ROOTSTOCK O'LEVEL MATH BOOK

---

### **Step 1: Install Prerequisites**

Ensure you have the following installed:

1. **Node.js** (v16 or higher) and **pnpm**
2. **Git** for cloning repositories.

---

### **Step 2: Clone the Repository**

1. Open a terminal and clone the Rootstock project repository:

   ```bash
   git clone https://github.com/Tibz-Dankan/rsk-o-math-book.git
   cd rsk-o-math-book
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

---

### **Step 3: Configure the Project**

1. **Create an `.env` file** in the root directory:

   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and configure:

   - **PRIVATE_KEY**: Provide your wallet private key for deployment.
   - **INFURA_API_KEY** or equivalent provider: Provide the API key for connecting to Rootstock testnet/mainnet.

   Example `.env` file:

   ```plaintext
   PRIVATE_KEY=your-private-key
   INFURA_API_KEY=your-infura-api-key
   NETWORK=rskTestnet
   ```

---

### **Step 4: Compile the Smart Contracts**

Compile the contracts to ensure there are no issues:

```bash
pnpm hardhat compile
```

---

### **Step 5: Run Tests**

1. Run all tests:

   ```bash
   pnpm hardhat test
   ```

2. If you want to run a specific test file:
   ```bash
   pnpm hardhat test test/converter.js
   ```

---

### **Step 6: Deploy Smart Contracts**

1. Edit the deployment script (usually found in `scripts/deploy.js` or `scripts/deploy.ts`) to suit your needs.
2. Deploy to a local network (Hardhat Node):

   ```bash
   pnpm hardhat node
   ```

   Open another terminal and run:

   ```bash
   pnpm hardhat run scripts/deploy.js --network localhost
   ```

3. Deploy to the Rootstock testnet:

   ```bash
   pnpm hardhat run scripts/deploy.js --network rskTestnet
   ```

4. Deploy to the Rootstock mainnet (ensure you're using a live network configuration):
   ```bash
   pnpm hardhat run scripts/deploy.js --network rskMainnet
   ```

---

### **Step 7: Interact with Deployed Contracts**

1. Use the Hardhat console to interact with deployed contracts:

   ```bash
   pnpm hardhat console --network localhost
   ```

2. In the console, you can use JavaScript/TypeScript to interact with your contracts:
   ```javascript
   const Contract = await ethers.getContractFactory("YourContractName");
   const contract = await Contract.attach("deployed-contract-address");
   console.log(await contract.someFunction());
   ```
