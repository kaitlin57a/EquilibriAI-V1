import { Connection, Keypair, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import NodeCache from "node-cache";

// Provider configuration
const PROVIDER_CONFIG = {
    DEFAULT_RPC: "https://api.mainnet-beta.solana.com",
};

// Wallet Provider Class
class WalletProvider {
    private connection: Connection;
    private keypair: Keypair;
    private cache: NodeCache;

    constructor(privateKey: string) {
        this.connection = new Connection(PROVIDER_CONFIG.DEFAULT_RPC);
        this.keypair = Keypair.fromSecretKey(Buffer.from(privateKey, 'base64'));
        this.cache = new NodeCache();
    }

    getPublicKey(): PublicKey {
        return this.keypair.publicKey;
    }

    async getBalance(): Promise<BigNumber> {
        const balance = await this.connection.getBalance(this.keypair.publicKey);
        return new BigNumber(balance).dividedBy(1e9); // Convert lamports to SOL
    }

    async transferTokens(destination: string, amount: number): Promise<string> {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: this.keypair.publicKey,
                toPubkey: new PublicKey(destination),
                lamports: new BigNumber(amount).multipliedBy(1e9).toNumber(), // Convert SOL to lamports
            })
        );

        const signature = await this.connection.sendTransaction(transaction, [this.keypair]);
        await this.connection.confirmTransaction(signature);

        return signature;
    }
}

// Instantiate WalletProvider for EquilibriAI
const EquilibriAIWallet = new WalletProvider("<PRIVATE_KEY_BASE64>");

export { EquilibriAIWallet };
