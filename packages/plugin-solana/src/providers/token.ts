import { Connection, Keypair, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import NodeCache from "node-cache";

const DEF_TOKEN_CONFIG = {
    BOON: {
        symbol: "BOON",
        deflationRate: 0.01, // 1% burn per transaction
    },
    BANE: {
        symbol: "BANE",
        deflationRate: 0.02, // 2% burn per transaction
    },
};

class TokenManager {
    private connection: Connection;

    constructor() {
        this.connection = new Connection("https://api.mainnet-beta.solana.com");
    }

    async transferWithDeflation(
        token: keyof typeof DEF_TOKEN_CONFIG,
        from: Keypair,
        to: PublicKey,
        amount: number
    ): Promise<string> {
        const deflationRate = DEF_TOKEN_CONFIG[token].deflationRate;
        const burnAmount = amount * deflationRate;
        const transferAmount = amount - burnAmount;

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: new BigNumber(transferAmount).multipliedBy(1e9).toNumber(),
            })
        );

        // Simulate burning the deflation amount (in practice, send to a burn address)
        const burnTransaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: new PublicKey("BurnAddress111111111111111111111111111111111"),
                lamports: new BigNumber(burnAmount).multipliedBy(1e9).toNumber(),
            })
        );

        const signature = await this.connection.sendTransaction(transaction, [from]);
        await this.connection.sendTransaction(burnTransaction, [from]);
        await this.connection.confirmTransaction(signature);

        return signature;
    }
}

const tokenManager = new TokenManager();
export { tokenManager, DEF_TOKEN_CONFIG };
