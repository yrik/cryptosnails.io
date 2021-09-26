import { useState, useEffect } from 'react';

import { ethers } from "ethers";
import { Helmet } from "react-helmet";
import { useMoralis } from 'react-moralis'

import './App.css';
import { abi } from "./CryptoSnailsABI.js";
import { MemoizedGame, Game } from './Game.js'


function App({ isProduction }) {

  const options = {
    //address: "0x37af8Ff206D7D7e85B3dED055F7B8082dAc22067",  // TODO: switch depending on test/prod network
    address: "0x7A02175D2370033AA73df96BBb45813bF9DDE771",
    abi: abi,
    chain: isProduction ? "polygon" : "mumbai"
  };

  const { Moralis, web3, isInitialized, authenticate, logout, isAuthenticated, user, isWeb3Enabled, enableWeb3, web3EnableError, isWeb3EnableLoading } = useMoralis()

  const [snailPrice, setSnailPrice] = useState(undefined)
  const [totalSupply, setTotalSupply] = useState(undefined)

  const [amount, setAmount] = useState(1)
  const price = amount * snailPrice

  useEffect(()=>{
    async function init() {      

      if (isInitialized) {
        const totalSupply = await Moralis.Web3API.native.runContractFunction({function_name: "totalSupply", ...options})
        setTotalSupply(totalSupply)

        const snailPrice = await Moralis.Web3API.native.runContractFunction({function_name: "snailPrice", ...options})
        setSnailPrice(ethers.utils.parseUnits(snailPrice, "wei"))
      }
    }
    init()
  }, [isInitialized])

  async function mintSnail() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(options.address, options.abi, signer);

      const tx = await contract.buy(amount, {value: price})
      const receipt = await tx.wait()
      console.log(receipt)
  }

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Crypto Snails - Earn $snail crypto by playing the game</title>
      </Helmet>

      <div className="flex justify-end">
        <div className="flex px-5 py-5">
          <select value={isProduction ? "polygon" : "mumbai"}>
            <option value="polygon">Polygon Mainnet</option>
            <option value="mumbai">Polygon Testnet</option>
          </select>
        </div>
        <div className="flex px-5 py-5 mr-5">
        { isAuthenticated ? (
          <button className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" onClick={() => logout()}>Logout</button>
        ) : (
          <button className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" onClick={async () => {await enableWeb3(); await authenticate({signingMessage: "CryptoSnails Auth"})}}>Connect Wallet</button>
        )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl text-center">Earn $snail crypto by playing the game</h1>
        <div className="flex justify-center">
          <h4 className="max-w-xl mt-1 text-center">Every day coins are thrown on the table. Collect them with a snail. In future snails can be staked to collect coins automatically.</h4>
        </div>
      </div>

      <div className="pt-5 flex justify-center">
        <div className="flex w-300">
          <div className="m-10">
            <h1 className="text-xl">Mint CryptoSnails</h1>
            <br/>
            <span>Available: {10000 - totalSupply} out of 10000</span>
            <br/>
            <span>price: {price && ethers.utils.formatEther(price)} eth</span>
            <br/>
            <input className="outline-black mr-5" type="number" min="1" max="100" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button 
              onClick={mintSnail} 
              className="bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded"
            >Mint</button>
          </div>
        </div>
      </div>

          <div>
          { isInitialized ? <MemoizedGame Moralis={Moralis}/> : null}
          </div>

    </>
  )

}

export default App;
