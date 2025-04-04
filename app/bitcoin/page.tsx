"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";
import { ECPairFactory } from "ecpair";

// Create ECPair instance using ECPairFactory with tiny-secp256k1
const ECPair = ECPairFactory(ecc);

const BitcoinSample: React.FC = () => {
    const [generatedAddress, setGeneratedAddress] = useState<string>("");
    const [donationAmount, setDonationAmount] = useState<string>("");
    const [txStatus, setTxStatus] = useState<string>("");

    useEffect(() => {
        // Generate a random Bitcoin key pair
        const keyPair = ECPair.makeRandom();
        // Convert publicKey (Uint8Array) to Buffer
        const pubkeyBuffer = Buffer.from(keyPair.publicKey);
        // Create P2PKH payment object using Buffer for pubkey
        const { address } = bitcoin.payments.p2pkh({ pubkey: pubkeyBuffer });
        if (address) {
            setGeneratedAddress(address);
        }
    }, []);

    const sendDonation = () => {
        if (!donationAmount || isNaN(parseFloat(donationAmount))) {
            alert("Please enter a valid donation amount in BTC.");
            return;
        }
        // در یک پروژه واقعی باید تراکنش بیت‌کوین ساخته و امضا شود.
        // در این مثال، فقط تراکنش به صورت شبیه‌سازی نمایش داده می‌شود.
        setTxStatus(`Simulated Bitcoin donation of ${donationAmount} BTC sent to ${generatedAddress}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <Link
                href="/"
                className="text-blue-600 hover:underline"
            >
                ← Back Home
            </Link>
            <h1 className="text-3xl font-bold my-4">Bitcoin Donation Sample</h1>
            <div>
                <p><strong>Donation Wallet Address:</strong> {generatedAddress}</p>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter donation amount in BTC"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="px-4 py-2 border rounded w-full mb-2"
                    />
                    <button
                        onClick={sendDonation}
                        className="px-4 py-2 bg-green-500 !text-white rounded hover:bg-green-600"
                    >
                        Donate
                    </button>
                </div>
                {txStatus && <p className="mt-4 text-sm text-gray-700">{txStatus}</p>}
            </div>
            <p className="mt-8 text-center text-gray-500">
                User donation status and details will be displayed here.
            </p>
        </div>
    );
};

export default BitcoinSample;