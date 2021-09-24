import { useState, useEffect } from 'react';

import { ethers } from "ethers";
import { Helmet } from "react-helmet";

import './App.css';
import { abi } from "./CryptoSnailsABI.js";

const options = {
  address: "0x37af8Ff206D7D7e85B3dED055F7B8082dAc22067",
  abi: abi
};


let provider;
let signer;
let contract;


function App() {

  const SNAIL_PRICE = 0.0005
  const [amount, setAmount] = useState(1)
  const price = amount * SNAIL_PRICE

  const [userAddress, setUserAddress] = useState(undefined)
  const [userBalance, setUserBalance] = useState(undefined)

  const [totalSupply, setTotalSupply] = useState(undefined)

  useEffect(()=>{
    async function init() {
      provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);

      signer = provider.getSigner()
      contract = new ethers.Contract(options.address, options.abi, signer);

      const totalSupply = await contract.totalSupply()
      console.log(totalSupply)
      setTotalSupply(totalSupply.toNumber())

      const address = await signer.getAddress() 
      setUserAddress(address)

      const balance = await signer.getBalance()
      setUserBalance(balance)
    }
    init()
  }, [])


  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Crypto Snails - Earn $snail crypto by playing the game</title>
      </Helmet>

      <div className="pt-20 flex justify-center">
        <div className="flex w-300">
          <div className="m-10">

            <div className="mb-10">
            <span className="text-xl">User</span> 
            <br/>
            address: {userAddress}<br/>
            balance: {userBalance ? ethers.utils.formatEther(userBalance):null}
            </div>

            <h1 className="text-xl">Mint CryptoSnails</h1>
            <br/>
            <span>Available: {10000 - totalSupply} out of 10000</span>
            <br/>
            <span>price: {price} eth</span>
            <br/>
            <input className="outline-black mr-5" type="number" min="1" max="100" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button 
              onClick={async () => {
                console.log(contract)
                const tx = await contract.buy(amount, {value: ethers.utils.parseEther('' + price)})
                const receipt = await tx.wait()
                console.log(receipt)
              }} 
              className="bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded"
            >Mint</button>
          </div>
        </div>
      </div>
    </>
  )

}

export default App;
