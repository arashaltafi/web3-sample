"use client"

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Link from "next/link";

const EtherSample: React.FC = () => {
    const [isWeb3, setIsWeb3] = useState<boolean>(false);
    const [account, setAccount] = useState<string>("");
    const [balance, setBalance] = useState<string>("");
    const [donationAmount, setDonationAmount] = useState<string>("");
    const [donationAddress, setDonationAddress] = useState<string>("");
    const [txStatus, setTxStatus] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).ethereum) {
            setIsWeb3(true);
        } else {
            setIsWeb3(false);
        }
    }, []);

    const connectWallet = async () => {
        try {
            if ((window as any).ethereum) {
                const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]);
                const web3 = new Web3((window as any).ethereum);
                const balanceWei = await web3.eth.getBalance(accounts[0]);
                setBalance(web3.utils.fromWei(balanceWei, "ether"));
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const sendDonation = async () => {
        if (!donationAddress) {
            alert("Please enter the donation wallet address.");
            return;
        }
        if (!donationAmount || isNaN(parseFloat(donationAmount))) {
            alert("Please enter a valid donation amount in ETH.");
            return;
        }
        try {
            const web3 = new Web3((window as any).ethereum);
            const value = web3.utils.toWei(donationAmount, "ether");
            const tx = await (window as any).ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: account,
                    to: donationAddress,
                    value: web3.utils.toHex(value),
                }],
            });
            setTxStatus(`Transaction sent: ${tx}`);
        } catch (error) {
            console.error("Transaction error:", error);
            setTxStatus("Transaction failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <Link
                href="/"
                className="!text-blue-600 hover:underline"
            >
                ← Back Home
            </Link>
            <h1 className="text-3xl !text-white font-bold my-4">Ether Donation Sample</h1>
            {!isWeb3 && (
                <p className="!text-red-500">No Web3 provider detected. Please install MetaMask.</p>
            )}
            {isWeb3 && !account && (
                <button
                    onClick={connectWallet}
                    className="px-4 py-2 bg-blue-500 !text-white rounded hover:bg-blue-600"
                >
                    Connect Wallet
                </button>
            )}
            {account && (
                <div className="mt-4">
                    <p><strong>Your Wallet Address:</strong> {account}</p>
                    <p><strong>Your Balance:</strong> {balance} ETH</p>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Enter donation wallet address"
                            value={donationAddress}
                            onChange={(e) => setDonationAddress(e.target.value)}
                            className="px-4 py-2 border rounded w-full mb-2 !text-white"
                        />
                        <input
                            type="text"
                            placeholder="Enter donation amount in ETH"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="px-4 py-2 border rounded w-full mb-2 !text-white"
                        />
                        <button
                            onClick={sendDonation}
                            className="px-4 py-2 bg-green-500 !text-white rounded hover:bg-green-600"
                        >
                            Donate
                        </button>
                    </div>
                    {txStatus && <p className="mt-4 text-sm !text-gray-700">{txStatus}</p>}
                </div>
            )}
            <p className="mt-8 text-center !text-gray-500">
                User currency and transaction status will be displayed here.
            </p>
        </div>
    );
};

export default EtherSample;