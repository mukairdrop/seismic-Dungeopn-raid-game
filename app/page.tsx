"use client";

import { useState } from "react";
import { ethers } from "ethers";

const contractAddress =
  "PASTE_YOUR_CONTRACT_ADDRESS";

const abi = [

  "function exploreDungeon() external",

  "function openChest() external",

  "function bossRaid() external",

  "function getPlayer(address) view returns(uint256 xp,uint256 gold,uint256 level,uint256 bossKills)"
];

export default function Home() {

  const [wallet, setWallet] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function connectWallet() {

    if(!window.ethereum) {

      alert("Install Rabby");

      return;
    }

    const accounts =
      await window.ethereum.request({

        method:
          "eth_requestAccounts"
      });

    setWallet(accounts[0]);
  }

  async function execute(
    method: string
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
        "TX SUCCESS"
      );

    } catch(err) {

      console.log(err);

      alert(
        "TX FAILED"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">

      <h1 className="text-5xl font-bold">

        Dungeon Raid

      </h1>

      {

        wallet ? (

          <p>
            {wallet}
          </p>

        ) : (

          <button

            onClick={connectWallet}

            className="bg-blue-600 px-6 py-3 rounded-xl"
          >

            Connect Wallet

          </button>
        )
      }

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
