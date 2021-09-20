import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import {Helmet} from "react-helmet";

import logo from './logo.svg';
import './App.css';
import { abi } from "./CryptoSnailsABI.js";

function Auth ({authenticate, enableWeb3, isAuthenticated, user, isAuthenticating, logout, ...props}) {

  if (!isAuthenticated) {
    return (
      <div {...props}>
        <button 
          onClick={() => {
            authenticate({ signingMessage: "CryptoSnails Auth", onSuccess: enableWeb3 })
          }}
          disabled={isAuthenticating}
        >Connect Wallet</button>
      </div>
    );
  }

  const addr = user.get("ethAddress") || ""
  const shortAddr = addr.slice(0, 4) + '...' + addr.slice(-4)

  return (
    <div {...props}>
      <button onClick={logout} disabled={isAuthenticating}>Logout ({shortAddr})</button>
    </div>
  );

}

function Mint ({ user }) {

  return (
    <div className="m-10">
      <h1 className="text-xl">Mint CryptoSnails</h1>
    </div>
  );

}

function App() {
  const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();
  const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis()

  const chain = 'rinkeby'


  const options = {
    chain: chain,
    address: "0x37af8Ff206D7D7e85B3dED055F7B8082dAc22067",
    abi: abi
  };

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Crypto Snails - Earn $snail crypto by playing the game</title>
      </Helmet>
      <div className="flex justify-end -m-2">
        <Auth className="flex items-center justify-center m-2 p-5" authenticate={authenticate} enableWeb3={enableWeb3} isAuthenticated={isAuthenticated} user={user} logout={logout} isAuthenticating={isAuthenticating} />
      </div>
      <div className="pt-20 flex justify-center">
        <Mint className="flex w-300 bg-red" />
        <div>
          {web3EnableError && <div>{web3EnableError}</div>}
          <button onClick={() => enableWeb3()} disabled={isWeb3EnableLoading}>Enable web3</button>
        </div>
      </div>
    </>
  )

}

export default App;
