(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{1040:function(e,t,n){},1043:function(e,t,n){},1044:function(e,t,n){var a={"./ion-phaser.entry.js":[1046,5]};function i(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],i=t[0];return n.e(t[1]).then((function(){return n(i)}))}i.keys=function(){return Object.keys(a)},i.id=1044,e.exports=i},1045:function(e,t,n){"use strict";n.r(t);var a=n(150),i=n(8),r=n.n(i),s=n(213),o=n.n(s),u=n(176),c=(n(1040),n(3)),p=n.n(c),l=n(54),d=n(60),y=n(179),f=n(463),b=(n(1043),[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"approved",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!1,internalType:"bool",name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"approve",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"snailsAmount",type:"uint256"}],name:"buy",outputs:[],stateMutability:"payable",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"reserveSnails",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"},{internalType:"bytes",name:"_data",type:"bytes"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"operator",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"toogleSale",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"transferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],stateMutability:"nonpayable",type:"constructor"},{inputs:[{internalType:"address",name:"owner",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"getApproved",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"MAX_SNAILS",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"ownerOf",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"snailPrice",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"statusSale",outputs:[{internalType:"bool",name:"status",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"index",type:"uint256"}],name:"tokenByIndex",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"uint256",name:"index",type:"uint256"}],name:"tokenOfOwnerByIndex",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"}],name:"tokensOfOwner",outputs:[{internalType:"string[]",name:"ownerTokens",type:"string[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}]),m=n(108),x=n(280),h=n.n(x),v=n(467),g=n(13);function j(e){var t,n,a=e.Moralis,r=Object(i.useRef)(null),s=a.Object.extend("PlayerPosition"),o=Object(i.useState)(),u=Object(d.a)(o,2),c=(u[0],u[1],Object(i.useState)(void 0)),y=Object(d.a)(c,2),f=y[0],b=y[1],x={scale:{mode:h.a.Scale.FIT,autoCenter:h.a.Scale.CENTER_BOTH,width:800,height:600},physics:{default:"arcade",arcade:{debug:!1}},scene:{preload:function(){return k.apply(this,arguments)},create:function(){return M.apply(this,arguments)},update:function(e,t){return I.apply(this,arguments)}}};Object(i.useEffect)((function(){function e(){return(e=Object(l.a)(p.a.mark((function e(){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=a.User.current(),b(n),!n){e.next=6;break}return e.next=5,F();case 5:t=e.sent;case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}));var j,w,O=0,T={};function k(){return(k=Object(l.a)(p.a.mark((function e(){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t||"/images/basic-snail.svg",this.load.image("player",n),this.load.image("coin","/images/coin.png"),this.load.image("tiles","/images/sprite.png");case 4:case"end":return e.stop()}}),e,this)})))).apply(this,arguments)}function M(){return(M=Object(l.a)(p.a.mark((function e(){var t,i,r,s,o,u,c,l,d,y,b,x,h,v,g,k,M,I,S,P,F,N,E=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new a.Query("Level"),e.next=3,t.descending("createdAt").first();case 3:return i=e.sent,r=i.get("size"),s=Object(m.a)(Array(r).keys()),o=this.make.tilemap({data:s.map((function(e){return s.map((function(e){return 4}))})),tileWidth:32,tileHeight:32,tileMargin:0,tileSpacing:0}),u=o.addTilesetImage("tiles"),o.createLayer(0,u,0,0),c=this.make.tilemap({data:i.get("data"),tileWidth:32,tileHeight:32,tileMargin:0,tileSpacing:0}),l=c.addTilesetImage("tiles"),(d=c.createLayer(0,l,0,0)).setCollisionBetween(1,50),y=this.make.tilemap({data:s.map((function(e){return s.map((function(t){if(0==e||e==r-1||0==t||t==r-1)return 3}))})),tileWidth:32,tileHeight:32,tileMargin:0,tileSpacing:0}),b=y.addTilesetImage("tiles"),(x=y.createLayer(0,b,0,0)).setCollisionBetween(1,50),h=this.cameras.main,j=this.input.keyboard.createCursorKeys(),h.setBounds(0,0,o.widthInPixels,o.heightInPixels),v=this.physics.add.staticGroup(),g=new a.Query("Coin"),e.next=24,g.limit(1e3).find();case 24:return e.sent.map((function(e){console.log("coins",v),v.create(32*e.get("x"),32*e.get("y"),"coin")})),e.next=28,g.subscribe();case 28:if(e.sent.on("create",(function(e){console.log("created",e),v.create(32*e.get("x"),32*e.get("y"),"coin"),v.refresh()})),!f){e.next=59;break}return O=f.get("coinScore")||0,(k=new a.Query("PlayerPosition")).equalTo("player",f.get("ethAddress")),e.next=36,k.descending("createdAt").first();case 36:return M=e.sent,I=300,S=300,M&&M.get("x")&&M.get("y")&&(I=M.get("x"),S=M.get("y")),n=this.physics.add.image(I,S,"player").setScale(.25).refreshBody(),this.physics.add.overlap(n,v,A,null,this),this.physics.add.collider(n,d),this.physics.add.collider(n,x),h.startFollow(n),P=new a.Query("PlayerPosition"),e.next=48,P.subscribe();case 48:return e.sent.on("create",(function(e){var t=e.get("x"),n=e.get("y"),a=e.get("player");a!=(f?f.get("ethAddress"):void 0)&&(void 0==T[a]?T[a]=E.add.image(t,n,"player").setScale(.2):(T[a].x=t,T[a].y=n))})),F=new a.Query("Level"),e.next=53,F.subscribe();case 53:e.sent.on("create",(function(e){console.log("New Level created");var t=e.get("size");Object(m.a)(Array(t).keys())})),w=this.add.text(16,16,"Coins Collected: ".concat(O),{font:"12px monospace",fill:"#ffffff",padding:{x:10,y:5},backgroundColor:"#000000"}).setScrollFactor(0),(N=this.add.text(180,16,"Claim",{font:"12px monospace",fill:"#ffffff",padding:{x:10,y:5},backgroundColor:"#000000"}).setScrollFactor(0)).setInteractive(),N.on("pointerdown",C);case 59:case"end":return e.stop()}}),e,this)})))).apply(this,arguments)}function I(){return(I=Object(l.a)(p.a.mark((function e(t,a){var i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j&&(j.left.isDown?(n.setVelocityX(-160),n.setFlip(!1,!1)):j.right.isDown?(n.setVelocityX(160),n.setFlip(!0,!1)):j.down.isDown?n.setVelocityY(160):j.up.isDown&&n.setVelocityY(-160)),!n){e.next=12;break}if(n.lastX==n.x&&n.lastY==n.y){e.next=12;break}if(!f){e.next=12;break}return(i=new s).set("player",f.get("ethAddress")),i.set("x",n.x),i.set("y",n.y),n.lastX=n.x,n.lastY=n.y,e.next=12,i.save();case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){return S.apply(this,arguments)}function S(){return(S=Object(l.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return alert("Moving coins to your account.."),e.next=3,a.Cloud.run("claimCoins");case 3:return O=0,f.set("coinScore",0),e.next=7,f.save();case 7:w.setText("Coins collected: ".concat(O));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(e,t){return P.apply(this,arguments)}function P(){return(P=Object(l.a)(p.a.mark((function e(t,n){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.destroy(n.x,n.y),O++,f.set("coinScore",O),e.next=5,f.save();case 5:return e.next=7,a.Cloud.run("collectCoin",{x:n.x/32,y:n.y/32});case 7:return w.setText("Coins collected: ".concat(O)),e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(){return N.apply(this,arguments)}function N(){return(N=Object(l.a)(p.a.mark((function e(){var t,n,i,r,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",void 0);case 4:if(t=e.sent){e.next=9;break}return e.next=8,undefined.first();case 8:t=e.sent;case 9:if(t){e.next=11;break}return e.abrupt("return",void 0);case 11:if(t.get("token_uri")){e.next=13;break}return e.abrupt("return",void 0);case 13:return e.next=15,a.Cloud.run("getTokenData",{tokenUri:t.get("token_uri")});case 15:return n=e.sent,i=n.data.image_data,r=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(r),console.log("url",s),e.abrupt("return",s);case 21:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return console.log("IonPhaser"),console.log("IonPhaser INIT"),Object(g.jsx)(v.a,{ref:r,game:x})}var w=r.a.memo(j);var O=function(e){var t=e.isProduction,n={address:"0x7A02175D2370033AA73df96BBb45813bF9DDE771",abi:b,chain:t?"polygon":"mumbai"},r=Object(u.b)(),s=r.Moralis,o=(r.web3,r.isInitialized),c=r.authenticate,m=r.logout,x=r.isAuthenticated,h=(r.user,r.isWeb3Enabled,r.enableWeb3),v=(r.web3EnableError,r.isWeb3EnableLoading,Object(i.useState)(void 0)),j=Object(d.a)(v,2),O=j[0],T=j[1],k=Object(i.useState)(void 0),M=Object(d.a)(k,2),I=M[0],C=M[1],S=Object(i.useState)(1),A=Object(d.a)(S,2),P=A[0],F=A[1],N=P*O;function E(){return(E=Object(l.a)(p.a.mark((function e(){var t,a,i,r,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new y.a.providers.Web3Provider(window.ethereum),a=t.getSigner(),i=new y.a.Contract(n.address,n.abi,a),e.next=5,i.buy(P,{value:N});case 5:return r=e.sent,e.next=8,r.wait();case 8:s=e.sent,console.log(s);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(i.useEffect)((function(){function e(){return(e=Object(l.a)(p.a.mark((function e(){var t,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!o){e.next=9;break}return e.next=3,s.Web3API.native.runContractFunction(Object(a.a)({function_name:"totalSupply"},n));case 3:return t=e.sent,C(t),e.next=7,s.Web3API.native.runContractFunction(Object(a.a)({function_name:"snailPrice"},n));case 7:i=e.sent,T(y.a.utils.parseUnits(i,"wei"));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[o]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)(f.a,{children:[Object(g.jsx)("meta",{charSet:"utf-8"}),Object(g.jsx)("title",{children:"Crypto Snails - Earn $snail crypto by playing the game"})]}),Object(g.jsxs)("div",{className:"flex justify-end",children:[Object(g.jsx)("div",{className:"flex px-5 py-5",children:Object(g.jsxs)("select",{value:t?"polygon":"mumbai",children:[Object(g.jsx)("option",{value:"polygon",children:"Polygon Mainnet"}),Object(g.jsx)("option",{value:"mumbai",children:"Polygon Testnet"})]})}),Object(g.jsx)("div",{className:"flex px-5 py-5 mr-5",children:x?Object(g.jsx)("button",{className:"underline text-blue-600 hover:text-blue-800 visited:text-purple-600",onClick:function(){return m()},children:"Logout"}):Object(g.jsx)("button",{className:"underline text-blue-600 hover:text-blue-800 visited:text-purple-600",onClick:Object(l.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:return e.next=4,c({signingMessage:"CryptoSnails Auth"});case 4:case"end":return e.stop()}}),e)}))),children:"Connect Wallet"})})]}),Object(g.jsxs)("div",{children:[Object(g.jsx)("h1",{className:"text-3xl text-center",children:"Earn $snail crypto by playing the game"}),Object(g.jsx)("div",{className:"flex justify-center",children:Object(g.jsx)("h4",{className:"max-w-xl mt-1 text-center",children:"Every day coins are thrown on the table. Collect them with a snail. In future snails can be staked to collect coins automatically."})})]}),Object(g.jsx)("div",{className:"pt-5 flex justify-center",children:Object(g.jsx)("div",{className:"flex w-300",children:Object(g.jsxs)("div",{className:"m-10",children:[Object(g.jsx)("h1",{className:"text-xl",children:"Mint CryptoSnails"}),Object(g.jsx)("br",{}),Object(g.jsxs)("span",{children:["Available: ",1e4-I," out of 10000"]}),Object(g.jsx)("br",{}),Object(g.jsxs)("span",{children:["price: ",N&&y.a.utils.formatEther(N)," eth"]}),Object(g.jsx)("br",{}),Object(g.jsx)("input",{className:"outline-black mr-5",type:"number",min:"1",max:"100",value:P,onChange:function(e){return F(e.target.value)}}),Object(g.jsx)("button",{onClick:function(){return E.apply(this,arguments)},className:"bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded",children:"Mint"})]})})}),Object(g.jsx)("div",{children:o?Object(g.jsx)(w,{Moralis:s}):null})]})},T=function(e){e&&e instanceof Function&&n.e(4).then(n.bind(null,1050)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),i(e),r(e),s(e)}))},k={test:{appId:"qbDgtX7LMRwrKfrnFsVByi7pxup2gyuE3lX9O32I",serverUrl:"https://4xftb2hl4taq.grandmoralis.com:2053/server"},production:{appId:"JBfxbweoLK5be7xnZineX05Z3MRAPBoIohXvvqgX",serverUrl:"https://vqntw2bxdpp2.bigmoralis.com:2053/server"}};o.a.render(Object(g.jsx)(u.a,Object(a.a)(Object(a.a)({},k.test),{},{children:Object(g.jsx)(O,{isProduction:false})})),document.getElementById("root")),T(console.log)},711:function(e,t){},734:function(e,t){},736:function(e,t){},812:function(e,t){},814:function(e,t){},847:function(e,t){},852:function(e,t){},854:function(e,t){},861:function(e,t){},874:function(e,t){},892:function(e,t){},898:function(e,t){},900:function(e,t){},909:function(e,t){},911:function(e,t){}},[[1045,2,3]]]);
//# sourceMappingURL=main.819bdc6c.chunk.js.map