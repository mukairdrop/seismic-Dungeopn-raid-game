"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

const contractAddress =
  "0x293f3A4Ec886314e88DEFc2893794f2786Bcdf4a";

const abi = [

  "function exploreDungeon() external",

  "function openChest() external",

  "function bossRaid() external"
];

export default function Home() {

  const [mounted, setMounted] =
    useState(false);

  const [wallet, setWallet] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  async function connectWallet() {

    try {

      if(
        typeof window === "undefined"
      ) return;

      if(
        !window.ethereum
      ) {

        alert(
          "Install Rabby Wallet"
        );

        return;
      }

      const accounts =
        await window.ethereum.request({

          method:
            "eth_requestAccounts"
        });

      setWallet(accounts[0]);

    } catch(err) {

      console.log(err);
    }
  }

  async function execute(
    method
  ) {

    try {

      setLoading(true);

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(

          contractAddress,

          abi,

          signer
        );

      const tx =
        await contract[method]();

      await tx.wait();

      alert(
        "Transaction Success"
      );

    } catch(err) {

      console.log(err);

      alert(
        "Transaction Failed"
      );

    } finally {

      setLoading(false);
    }
  }

  if(!mounted) {

    return null;
  }

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">

      <h1 className="text-5xl font-bold">

        Dungeon Raid

      </h1>

      <button

        onClick={connectWallet}

        className="bg-blue-600 px-6 py-3 rounded-xl"

      >

        {

          wallet

          ?

          wallet.slice(0,6)
          +
          "..."
          +
          wallet.slice(-4)

          :

          "Connect Wallet"
        }

      </button>

      <div className="flex flex-col gap-4 w-64">

        <button

          disabled={loading}

          onClick={() =>
            execute(
              "exploreDungeon"
            )
          }

          className="bg-green-600 py-3 rounded-xl"

        >

          Explore Dungeon

        </button>

        <button

          disabled={loading}

          onClick={() =>
            execute(
              "openChest"
            )
          }

          className="bg-yellow-600 py-3 rounded-xl"

        >

          Open Chest

        </button>

        <button

          disabled={loading}

          onClick={() =>
            execute(
              "bossRaid"
            )
          }

          className="bg-red-600 py-3 rounded-xl"

        >

          Boss Raid

        </button>

      </div>

    </main>
  );
}
