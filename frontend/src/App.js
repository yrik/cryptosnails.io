import { useState, useEffect } from 'react';

import { ethers } from "ethers";
import { Helmet } from "react-helmet";
import { useMoralis } from 'react-moralis'

import './App.css';
import { abi } from "./CryptoSnailsABI.js";
import { MemoizedGame, Game, Leaderboard } from './Game.js'


function App({ isProduction }) {

  const chain = isProduction ? "polygon" : "mumbai"
  const NFT_ADDRESS = "0x1C44316e796879Ac7990D4cAD591a27138ba9Aa8"
  const NFT_SYNBOL = "SNAIL"

  const options = {
    address: NFT_ADDRESS,
    abi: abi,
    chain: chain,
  };

  const { Moralis, web3, isInitialized, authenticate, logout, isAuthenticated, user, isWeb3Enabled, enableWeb3, web3EnableError, isWeb3EnableLoading } = useMoralis()

  const [overlay, setOverlay] = useState(true)
  const [isMinting, setMinting] = useState(false)

  const [snailPrice, setSnailPrice] = useState(undefined)
  const [totalSupply, setTotalSupply] = useState(undefined)

  const [nfts, setNFTs] = useState([])
  const [activeNFT, setActiveNFT] = useState([])

  const [amount, setAmount] = useState(1)
  const price = amount * snailPrice

  async function fetchNFTs() {
    if (isAuthenticated) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(options.address, options.abi, signer);
      const nfts = await contract.tokensOfOwner(signer.getAddress())
      console.log('nfts', nfts)
      setNFTs(nfts)
      if (nfts.length > 0) {
        setActiveNFT(nfts[0])
      }
    }
  }

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

  useEffect(()=>{
    async function init() {      
      if (isInitialized & isAuthenticated) {
        await fetchNFTs()
      }
    }
    init()
  }, [isInitialized, isAuthenticated])


  async function mintSnail() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(options.address, options.abi, signer);

      setMinting(true)

      if (!isAuthenticated) {
        await login()
      }

      try {
        const tx = await contract.mint(amount, {value: price})
        const receipt = await tx.wait()
        console.log(receipt)
        await fetchNFTs()
        setOverlay(false)
      } catch(err) {
        setMinting(false)
        console.log(err)
        if (err & err.name) {
          alert(err.name + ': ' + err.message + '. ' + err.data ? err.data.message : '')
        } else {
          alert(err)
        }
      }
  }

  async function playDemo() {
    if (!isAuthenticated) {
      await login() 
    }
    setOverlay(false)
  }

  function play() {
    setOverlay(false)
  }

  async function login() {
    await enableWeb3()
    await authenticate({signingMessage: "CryptoSnails Auth"})
  }

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Crypto Snails - Earn $snail crypto by playing the game</title>
          <meta name="description" value="Every day coins are thrown on the table. Collect them with a snail." />
      </Helmet>

      <div className="flex justify-around bg-purple">
        <div className="flex p-5 py-4">
          <img src="/images/logo.png" style={{width: "178px", height: "32px"}}/>
        </div>

        <div className="w-70 py-6 text-sm text-gray-50">
          Available: {10000 - totalSupply} out of 10000 NFT Snails
        </div>

        <div className="flex px-5 py-4 mr-5">
        { isAuthenticated ? (
          <button className="bg-yellow-300 px-4 rounded-md bg-yellow" onClick={async () => {await logout(); setNFTs([]); setOverlay(true)}}>Logout</button>
        ) : (
          <button className="px-4 rounded-md bg-yellow" onClick={async () => {await login()}}>Connect Wallet</button>
        )}
        </div>
      </div>

      <div>
        <h1 className="mt-5 text-3xl text-center uppercase text-green font-bold">Earn $snail crypto by playing the game</h1>
        <div className="flex justify-center">
          <h4 className="max-w-x2l mt-1 text-center text-gray-500">Every day coins are thrown on the table. Collect them with a snail. In future snails can be staked to collect coins automatically.</h4>
        </div>
      </div>


      <div className="grid grid-cols-8 gap-1 p-5 m-auto" style={{maxWidth: "1150px"}}>

        <div className="col-span-6 relative" >
          <div>
            { isInitialized ? <MemoizedGame Moralis={Moralis}/> : null}

            { overlay ? (
            <div className="bg-purple bg-opacity-50 flex" style={{position: "absolute", top: "0px", width: "100%", height: "100%"}}>
              <div className="m-auto h-60 w-full bg-ping-200 flex justify-center">

                { nfts.length === 0 ? (
                <div className="w-48 h-60 text-center">
                  <div className="w-full h-40 border-gray-50 rounded-md border">
                  </div>
                  <div className="text-white font-bold uppercase text-sm">speed: mormal</div> 
                  <button className="px-8 py-2 rounded-md bg-yellow m-2 uppercase text-sm" onClick={async () => {await playDemo()}}>DEMO Play</button>
                </div>
                ) : 
                  (
                 <div className="w-48 h-60 text-center">
                  <div className="w-full h-40 border-gray-50 rounded-md border">
                    {activeNFT}
                  </div>
                  <div className="text-white font-bold uppercase text-sm">speed: mormal</div> 
                  <button className="px-8 py-2 rounded-md bg-green m-2 uppercase text-sm" onClick={async () => {play()}}>Play</button>
                </div>
                  )
               
                }

                <div className="ml-5 w-48 h-60 text-center">
                  <div className="w-full h-40 border-gray-50 rounded-md border">
                  </div>
                  <div className="text-white font-bold uppercase text-sm">speed: normal / VIP </div> 
                  <button disabled={isMinting} className="px-8 py-2 rounded-md m-2 bg-red text-white uppercase text-sm" onClick={async () => {mintSnail()}}>{isMinting ? "Processing.." : "Mint & Play"}</button>
                  <div>
                    <input className="border text-center mr-5" type="number" min="1" max="100" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                  <div className="p-0 m-0">
                    <span className="p-0 m-0 text-white text-xs">price: {price && ethers.utils.formatEther(price)} eth</span>
                  </div>
                  <div className="p-0 m-0">
                    <span className="p-0 m-0 text-white text-xs">Available: {10000 - totalSupply} out of 10000</span>
                  </div>
                </div>
              </div>
            </div>
            ): null}

          </div>

          {/*
          <br/>
          { isInitialized ? <Leaderboard Moralis={Moralis}/> : null}
          */}
        </div>

        <div className="col-span-2">
          <div className="mx-6">
            <div className="w-full h-40 bg-blue-200 border-gray-200 rounded-md border">
            </div>
            
            <div>
              <div className="py-2 font-bold text-sm text-gray-600">My Profile</div>
              <div className="text-sm text-gray-600">$Snail Tokens: N/A</div>
              <div className="text-sm text-gray-600">Snail NFTs: {user ? nfts.length : 'N/A'}</div>
              <div>
                {nfts.map(nft => (<div key={nft.token_id} className="bg-blue-200 inline-block mr-1 border-gray-50 rounded-md border w-12 h-12"></div>))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/*
      <div className="flex justify-center">
        <Roadmap />
      </div>
      */}

    </>
  )

}

function Roadmap() {

  return (
    <div className="text-center mt-10">
      <h3 className="text-xl pb-5">Roadmap</h3>
      <div>
        <table className="border-collapse border table-auto text-left">
          <tr>
            <td className="border p-5">Game prototype</td>
            <td className="border p-5">September 2021</td>
            <td className="border p-5 text-right">✅</td>
          </tr>
          <tr>
            <td className="border p-5">NFT collection draft</td>
            <td className="border p-5">September 2021</td>
            <td className="border p-5 text-right">✅</td>
          </tr>
          <tr>
            <td className="border p-5">NFT collection release</td>
            <td className="border p-5">October 2021</td>
            <td className="border p-5 text-right">pending</td>
          </tr>
          <tr>
            <td className="border p-5">Game release</td>
            <td className="border p-5">October 2021</td>
            <td className="border p-5 text-right">pending</td>
          </tr>
          <tr>
            <td className="border p-5">NFT staking</td>
            <td className="border p-5">November 2021</td>
            <td className="border p-5 text-right">pending</td>
          </tr>
          <tr>
            <td className="border p-5">Liqudity Pool staking</td>
            <td className="border p-5">November 2021</td>
            <td className="border p-5 text-right">pending</td>
          </tr>
        </table>
      </div>
    </div>
  )
}
export default App;
