"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { quais } from "quais";
import { contractAddress, contractABI } from "@/utils/contractInfo";

// Wallet Context
const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("Cüzdan Yok");
        return;
      }

      const pelagusProvider = window.ethereum.providers?.find(
        (p) => p?.isPelagus
      );

      if (pelagusProvider?.isPelagus) {
        const providerInstance = new quais.providers.Web3Provider(
          pelagusProvider || window.ethereum
        );
        setProvider(providerInstance);

        const accounts = await providerInstance.send("quai_requestAccounts");

        if (accounts.length > 0) {
          // window.ethereum.on("accountsChanged", (accounts) => {
          //   setAccount(accounts[0]);
          // });
          const userAccount = accounts[0];
          console.log(userAccount);
          setAccount(userAccount);
          const signerInstance = providerInstance.getSigner();
          setSigner(signerInstance);
          const userBalance = quais.utils.formatEther(
            await providerInstance.getBalance(userAccount)
          );
          setBalance(userBalance);

          const contractInstance = new quais.Contract(
            contractAddress,
            contractABI,
            providerInstance // signerInstance kullanıyoruz
          );

          setContract(contractInstance);
        } else {
          setError("Hesap Yok");
        }
      } else {
        setError("Pelagus Cüzdan Yok");
      }
    } catch (e) {
      setError("Hata Oluştu");
      console.error(e);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setProvider(null);
    setSigner(null);
    setContract(null);
    setError(null);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        balance,
        provider,
        signer,
        contract,
        error,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the WalletContext
export const useWallet = () => {
  return useContext(WalletContext);
};
