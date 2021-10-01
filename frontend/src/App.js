import { useState, useEffect } from 'react';

import { ethers } from "ethers";
import { Helmet } from "react-helmet";
import { useMoralis } from 'react-moralis'

import './App.css';
import { abi } from "./CryptoSnailsABI.js";
import { MemoizedGame, Game, Leaderboard } from './Game.js'


function App({ isProduction }) {

  const chain = isProduction ? "polygon" : "mumbai"
  const NFT_ADDRESS = "0xD725dcd6E4a37d992Eb76d859168ACb30Fdcd59f"
  const NFT_SYNBOL = "SNAIL"

  const options = {
    address: NFT_ADDRESS,
    abi: abi,
    chain: chain,
  };

  const { Moralis, web3, isInitialized, authenticate, logout, isAuthenticated, user, isWeb3Enabled, enableWeb3, web3EnableError, isWeb3EnableLoading } = useMoralis()

  const [overlay, setOverlay] = useState(true)
  const [isMinting, setMinting] = useState(false)
  const [isNFTFetched, setNFTFetched] = useState(false)

  const [snailPrice, setSnailPrice] = useState(undefined)
  const [totalSupply, setTotalSupply] = useState(undefined)

  const [nfts, setNFTs] = useState([])
  const [activeNFT, setActiveNFT] = useState([])

  const [amount, setAmount] = useState(1)
  const price = snailPrice && amount ? snailPrice.mul(amount) : undefined

  async function fetchNFTs() {
      setNFTFetched(false)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(options.address, options.abi, signer);
      let nfts = await contract.tokensOfOwner(signer.getAddress())
      nfts = await Promise.all(nfts.map(async (url) => {
        let resp = await fetch(url.replace('ipfs://', 'https://ipfs.io/ipfs/'))
        let nft = await resp.json()
        nft.image = nft.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
        nft['image-preview'] = nft['image-preview'].replace('ipfs://', 'https://ipfs.io/ipfs/')
        return nft
      }))
      setNFTs(nfts)
      if (nfts.length > 0) {
        setActiveNFT(nfts[0])
      }
      setNFTFetched(true)
  }

  useEffect(()=>{
    async function init() {      
      if (isInitialized) {
        const totalSupply = await Moralis.Web3API.native.runContractFunction({function_name: "totalSupply", ...options})
        setTotalSupply(totalSupply)

        const snailPrice = await Moralis.Web3API.native.runContractFunction({function_name: "snailPrice", ...options})
        setSnailPrice(ethers.BigNumber.from(snailPrice))
      }
    }
    init()
  }, [isInitialized])

  useEffect(()=>{
    async function init() {      
      if (isInitialized && isAuthenticated) {
        await switchNetwork()
        await fetchNFTs()
      }
    }
    init()
  }, [isInitialized, isAuthenticated])

  useEffect(()=>{
    async function init() {      
      try {
        window.ethereum.on('chainChanged', () => {
          document.location.reload()
        })

        window.ethereum.on('accountsChanged', () => {
          document.location.reload()
        })
      } catch(err) {console.log(err)}
    }
    init()
  }, [])


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
          alert(JSON.stringify(err))
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

  async function switchNetwork() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log('provider', provider)
    const { chainId } = await provider.getNetwork()
    console.log('chainId', chainId)
    // Try to switch to polygon if not on polygon or polygon testnet
    if (chainId !== 137 && chainId != 80001) {
      try {
        await provider.send("wallet_switchEthereumChain", [{ chainId: "0x89" }])
      } catch (error) {
        alert("Please switch to POLYGON network")
      }
    }
  }

  async function login() {
    await enableWeb3()
    await switchNetwork()
    await authenticate({signingMessage: "CryptoSnails Auth"})
  }

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Crypto Snails - Earn $snail crypto by playing the game</title>
          <meta name="description" value="Every day coins are thrown on the table. Collect them with a snail." />
      </Helmet>

          <div>
            { isInitialized ? <MemoizedGame activeNFT={activeNFT} Moralis={Moralis}/> : null}

            { overlay ? (
            <div className="bg-purple bg-opacity-50 flex" style={{position: "absolute", top: "0px", width: "100%", height: "100%"}}>

              
              {/*
              <div className="m-auto h-30 w-30 bg-gray-50">
                <h1 className="mt-5 text-3xl text-center uppercase text-green font-bold">Earn $snail crypto by playing the game</h1>
                <div className="flex justify-center">
                  <h4 className="max-w-x2l mt-1 text-center text-gray-500">Every day coins are thrown on the table. Collect them with a snail.</h4>
                </div>
              </div>
              */}

              <div className="m-auto w-auto flex justify-center">

                { nfts.length === 0 ? (
                <div className="w-60 h-90 p-5 text-center bg-gray-500">
                  <div className="w-full h-40 border-gray-50 rounded-md border">
                    <img className="max-h-full max-w-full mx-auto" src="/images/demo.png" />
                  </div>
                  <div className="text-white font-bold uppercase text-sm">speed: mormal</div> 
                  <button className="px-8 py-2 rounded-md bg-yellow m-2 uppercase text-sm" onClick={async () => {await playDemo()}}>DEMO Play</button>
                </div>
                ) : 
                  (
                <div className="w-60 h-90 p-5 text-center bg-gray-500">
                  <div className="w-full h-40 border-gray-50 rounded-md border">
                    <img className="max-h-full max-w-full mx-auto" src={activeNFT.image} />
                  </div>
                  <div className="text-white font-bold uppercase text-sm">speed: mormal</div> 
                  <button className="px-8 py-2 rounded-md bg-green m-2 uppercase text-sm" onClick={async () => {play()}}>Play</button>
                </div>
                  )
               
                }

                <div className="ml-5 w-60 h-90 p-5 text-center bg-gray-500">
                  <div className="w-full h-40 border-gray-50 rounded-md border">
                  </div>
                  <div className="text-white font-bold uppercase text-sm">speed: normal / VIP </div> 
                  <button disabled={isMinting} className="px-8 py-2 rounded-md m-2 bg-red text-white uppercase text-sm" onClick={async () => {mintSnail()}}>{isMinting ? "Processing.." : "Mint & Play"}</button>
                  <div>
                    <input className="border text-center mr-5" type="number" min="1" max="100" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                  <div className="p-0 m-0">
                    <span className="p-0 m-0 text-white text-xs">price: {price && ethers.utils.formatEther(price)} MATIC</span>
                  </div>
                  <div className="p-0 m-0">
                    <span className="p-0 m-0 text-white text-xs">Available: {10000 - totalSupply} out of 10000</span>
                  </div>
                </div>
              </div>
            </div>
            ): null}

          </div>
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
