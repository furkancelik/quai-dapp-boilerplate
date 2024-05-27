"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@/context/WalletContext";

const PointControls = () => {
  const { account, error, contract, signer } = useWallet();
  const [point, setPoint] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      fetchPoints(account);
    }
  }, [account, contract]);

  async function getPoints() {
    if (contract && signer) {
      try {
        setLoading(true);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.claimPoints();
        await tx.wait();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.warn("HATA:", e);
        alert("ERR:", e.toString());
      }
    }
  }
  async function fetchPoints(address) {
    if (contract && signer) {
      try {
        const contractWithSigner = contract.connect(signer);
        const _points = await contractWithSigner.getPoints(address);
        setPoint(_points);
      } catch (e) {
        console.error("Hata Detayları:", e);
      }
    }
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3 className="text-4xl">
        <span className="  font-semibold">Points:</span> {point}
      </h3>
      <button
        onClick={getPoints}
        className=" bg-green-600 text-white p-2 my-2 text-sm rounded-md "
      >
        {loading ? "Loading..." : "Claim Points"}
      </button>
    </div>
  );
};

export default PointControls;
