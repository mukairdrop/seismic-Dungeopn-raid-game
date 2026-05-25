"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

const contractAddress =
  "0x138ab9497c86ff7E0801b4514637595eeC73F869";

const abi = [

  "function exploreDungeon() external",

  "function openChest() external",

  "function bossRaid() external",

  "function healPlayer() external",

  "function getPlayer(address) view returns(uint256,uint256,uint256,uint256,uint256)"
];

export default function Home() {

  const [wallet, setWallet] =
    useState("");

  const [player, setPlayer] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  async function connectWallet() {

    const accounts =
      await window.ethereum.request({

        method:
          "eth_requestAccounts"
      });

    setWallet(accounts[0]);

    loadPlayer(accounts[0]);
  }

  async function loadPlayer(
    address
  ) {

    const provider =
      new ethers.BrowserProvider(
        window.ethereum
      );

    const contract =
      new ethers.Contract(

        contractAddress,

        abi,

        provider
      );

    const data =
      await contract.getPlayer(
        address
      );

    setPlayer({

      xp:
        Number(data[0]),

      gold:
        Number(data[1]),

      level:
        Number(data[2]),

      health:
        Number(data[3]),

      bossKills:
        Number(data[4]),
    });
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

      await loadPlayer(wallet);

    } catch(err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  }

  return (

    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-6xl font-bold text-center mb-8">

          ⚔ Dungeon Raid

        </h1>

        <div className="flex justify-center mb-8">

          <button

            onClick={connectWallet}

            className="bg-blue-600 px-6 py-3 rounded-xl text-lg"

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

        </div>

        {

          player && (

            <div className="grid grid-cols-2 gap-4 mb-8">

              <div className="bg-gray-800 p-6 rounded-2xl">

                <h2 className="text-2xl mb-4">

                  Player Stats

                </h2>

                <p>XP: {player.xp}</p>

                <p>Gold: {player.gold}</p>

                <p>Level: {player.level}</p>

                <p>Health: {player.health}</p>

                <p>Boss Kills: {player.bossKills}</p>

              </div>

              <div className="bg-gray-800 p-6 rounded-2xl">

                <h2 className="text-2xl mb-4">

                  Inventory

                </h2>

                <p>🗡 Sword</p>

                <p>🛡 Shield</p>

                <p>💎 Rare Gem</p>

              </div>

            </div>
          )
        }

        <div className="grid grid-cols-2 gap-4">

          <button

            disabled={loading}

            onClick={() =>
              execute(
                "exploreDungeon"
              )
            }

            className="bg-green-700 p-6 rounded-2xl text-xl"

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

            className="bg-yellow-700 p-6 rounded-2xl text-xl"

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

            className="bg-red-700 p-6 rounded-2xl text-xl"

          >

            Boss Raid

          </button>

          <button

            disabled={loading}

            onClick={() =>
              execute(
                "healPlayer"
              )
            }

            className="bg-purple-700 p-6 rounded-2xl text-xl"

          >

            Heal Player

          </button>

        </div>

      </div>

    </main>
  );
}
