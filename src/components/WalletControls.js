"use client";
import React from "react";
import { useWallet } from "@/context/WalletContext";

const WalletControls = () => {
  const { account, balance, error, connectWallet, disconnectWallet } =
    useWallet();

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {account ? (
        <div>
          <p>
            <span className="font-semibold">Account:</span> {account}
          </p>
          <p>
            <span className="font-semibold">Balance:</span> {balance} QUAI
          </p>
          <button
            className=" bg-red-500 text-white p-2 my-2 text-sm rounded-md "
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          className=" bg-green-600 text-white p-2 my-2 text-sm rounded-md "
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletControls;
