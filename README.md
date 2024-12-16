EquilibriAI: Solana Wallet and Deflationary Token Integration

Overview

EquilibriAI extends the Eliza framework to include the following features:

Solana Wallet Integration:

Full control over a Solana wallet.

Define a private key for the wallet.

Perform token transfers from the wallet.

Deflationary Token Management:

Introduces two custom tokens: BOON and BANE.

Implements deflationary mechanics:

BOON burns 1% of tokens in each transaction.

BANE burns 2% of tokens in each transaction.

Framework Compatibility:

Seamlessly integrates into the Eliza framework.

Designed to work as part of the plugin-solana package.

Features

Solana Wallet Provider

Public Key Retrieval: Obtain the public key of the controlled wallet.

Balance Query: Check the wallet balance in SOL.

Token Transfers: Transfer SOL to another wallet.

Code Example

const wallet = new WalletProvider("<PRIVATE_KEY_BASE64>");
console.log("Public Key:", wallet.getPublicKey().toString());

wallet.getBalance().then((balance) => {
    console.log("Balance in SOL:", balance.toString());
});

wallet.transferTokens("DestinationPublicKey", 1).then((tx) => {
    console.log("Transaction Signature:", tx);
});

BOON and BANE Tokens

Each token has a built-in deflation mechanism:

A percentage of the transferred amount is burned.

Configured for easy integration and deployment.

Code Example

const fromWallet = new Keypair();
const toPublicKey = new PublicKey("DestinationPublicKey");

// Transfer BOON tokens with deflation
const txSignature = await tokenManager.transferWithDeflation(
    "BOON",
    fromWallet,
    toPublicKey,
    100 // Transfer amount
);
console.log("Transaction Signature:", txSignature);

Project Structure

├── packages
│   ├── plugin-solana
│   │   ├── src
│   │   │   ├── providers
│   │   │   │   ├── wallet.ts   # Solana wallet logic
│   │   │   │   ├── token.ts    # BOON and BANE token logic

Deployment

Clone the repository to your local machine.

Ensure Node.js and npm are installed.

Install dependencies:

npm install

Build the project:

npm run build

Deploy using your preferred method (e.g., Docker, npm).

License

This project is licensed under the MIT License.

Contributions

Feel free to open issues or submit pull requests to improve this project!
