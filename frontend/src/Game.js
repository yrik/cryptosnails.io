import React, { useEffect, useState, useRef } from 'react'
import { useMoralis } from 'react-moralis'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
//import { GameComponent } from 'phaser-react-tools'


export function Game({ Moralis }) {
  const gameRef = useRef(null)
  const PlayerPosition = Moralis.Object.extend("PlayerPosition");

  const [game, setGame] = useState()

  const [user, setUser] = useState(undefined)
  let nft

  const config = {
      type: Phaser.AUTO,
      //parent: 'phaser',
      scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 900,
          height: 600
      },
       physics: {
          default: 'arcade',
          arcade: {
              debug: false
          }
      },
      scene: {
          preload: preload,
          create: create,
          update: update
      }
  };

  useEffect(()=>{
    async function init() {      
        let user = Moralis.User.current();
        setUser(user)
        if (user) {
          nft = await getNFT()
        }
        //setGame(Object.assign({}, config))
    }
    init()
  })

  let player;
  let coinScore = 0;
  let cursors;
  let text;

  const competitors = {};

  async function preload () {
      //let playerUrl = nft ? nft : "/images/basic-snail.svg"
      let playerUrl = "/images/snail.png"
      this.load.image("player", playerUrl);
      this.load.image("coin", "/images/coin.png");
      this.load.image("tiles", "/images/sprite.png");
  }


  async function create () {

    let levelQuery = new Moralis.Query('Level')
    const level = await levelQuery.descending("createdAt").first()

    const size = level.get('size')
    const indexes = [...Array(size).keys()]

    const backgroundTileMap = this.make.tilemap({ 
      data: indexes.map( _ => indexes.map( _ => 4)), 
      tileWidth: 32, tileHeight: 32, tileMargin: 0, tileSpacing: 0, 
    })
    const backgroundTileSet = backgroundTileMap.addTilesetImage("tiles")
    const backgroundLayer = backgroundTileMap.createLayer(0, backgroundTileSet, 0, 0); // layer index, tileset, x, y

    const wallsTileMap = this.make.tilemap({ 
      data: level.get('data'),
      tileWidth: 32, tileHeight: 32, tileMargin: 0, tileSpacing: 0, 
    })
    const wallsTileSet = wallsTileMap.addTilesetImage("tiles")
    const wallsLayer = wallsTileMap.createLayer(0, wallsTileSet, 0, 0); // layer index, tileset, x, y
    wallsLayer.setCollisionBetween(1, 50);


    const edgeTileMap = this.make.tilemap({ 
      data: indexes.map( row => indexes.map( col => {
       if(row == 0 || row == size-1 || col == 0 || col == size-1) return 3 
      })), 
      tileWidth: 32, tileHeight: 32, tileMargin: 0, tileSpacing: 0, 
    })
    const edgeTileSet = edgeTileMap.addTilesetImage("tiles")
    const edgeLayer = edgeTileMap.createLayer(0, edgeTileSet, 0, 0); // layer index, tileset, x, y
    edgeLayer.setCollisionBetween(1, 50);


    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    // Set up the arrows to control the camera
    cursors = this.input.keyboard.createCursorKeys();

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, backgroundTileMap.widthInPixels, backgroundTileMap.heightInPixels);

    // Help text that has a "fixed" position on the screen

    const coins = this.physics.add.staticGroup()
    let coinsQuery = new Moralis.Query('Coin')
    const coinsData = await coinsQuery.limit(1000).find()
    coinsData.map(coinData => {
      //console.log('coins', coins)
      coins.create(coinData.get('x') * 32, coinData.get('y') * 32, "coin"); 
    })

    let coinsSubscription = await coinsQuery.subscribe();
    coinsSubscription.on('create', (coinData) => {
      console.log('created', coinData)
      coins.create(coinData.get('x') * 32, coinData.get('y') * 32, "coin"); 
      coins.refresh()
    });

    if (user) {

      coinScore = user.get('coinScore') || 0

      let lastQuery = new Moralis.Query('PlayerPosition')
      lastQuery.equalTo("player", user.get("ethAddress"))
      const lastPosition = await lastQuery.descending("createdAt").first()
      let lastX = 300
      let lastY = 300
      if (lastPosition && lastPosition.get('x') && lastPosition.get('y')) {
        lastX = lastPosition.get('x')
        lastY = lastPosition.get('y')
      }

      player = this.physics.add.image(lastX, lastY, 'player').refreshBody();

      this.physics.add.overlap(player, coins, collectCoin, null, this);
      this.physics.add.collider(player, wallsLayer);
      this.physics.add.collider(player, edgeLayer);
      camera.startFollow(player)

      let query = new Moralis.Query('PlayerPosition');
      let subscription = await query.subscribe();
      subscription.on('create', (position) => {
        let x = position.get("x")
        let y = position.get("y")
        let addr = position.get("player")
        let currentUserAddr = user ? user.get("ethAddress") : undefined;

        // move competitors
        if(addr != currentUserAddr){
          // if first time seeing
          if(competitors[addr] == undefined){
            competitors[addr] = this.add.image(x, y, 'player').setScale(0.20);
          }
          else{
            competitors[addr].x = x;
            competitors[addr].y = y;
          }
        }
      });

      let levelQuery = new Moralis.Query('Level');
      let levelSubscription = await levelQuery.subscribe();
      levelSubscription.on('create', (level) => {
        console.log('New Level created')
        // TODO: check if works
        const size = level.get('size')
        const indexes = [...Array(size).keys()]

        /*
        wallsLayer.layer.data = level.get('data')

        backgroundLayer.layer.data = indexes.map( _ => indexes.map( _ => 4))

        edgeLayer.layer.data = indexes.map( row => indexes.map( col => {
           if(row == 0 || row == size-1 || col == 0 || col == size-1) return 3 
          }))
        */
      });

      text = this.add.text(16, 16, `Coins Collected: ${coinScore}`, {
          font: "12px monospace",
          fill: "#ffffff",
          padding: { x: 10, y: 5 },
          backgroundColor: "#000000"
      }).setScrollFactor(0);

      const claimButton = this.add.text(180, 16, `Claim`, {
          font: "12px monospace",
          fill: "#ffffff",
          padding: { x: 10, y: 5 },
          backgroundColor: "#000000"
      }).setScrollFactor(0);

      claimButton.setInteractive();
      claimButton.on('pointerdown', claimCoins);
    }
  }

  async function update(time, delta) {

    if (cursors) {
      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);
          player.setFlip(true, false)
      }
      else if (cursors.right.isDown)
      {
          player.setVelocityX(160);
          player.setFlip(false, false)
      }
      else if (cursors.down.isDown)
      {
          player.setVelocityY(160);
      }
      else if (cursors.up.isDown)
      {
          player.setVelocityY(-160);
      }
    }

    if (player) {
      if(player.lastX!=player.x  || player.lastY!=player.y){
        
        if (user) {
          const playerPosition = new PlayerPosition();

          playerPosition.set("player", user.get("ethAddress"));
          playerPosition.set("x",player.x);
          playerPosition.set("y",player.y)

          player.lastX = player.x;
          player.lastY = player.y;

          await playerPosition.save();
        }
      }
    }
  }

  async function claimCoins() {
    
    // TODO: check if user own NFT

      if (user) {
        alert("Moving coins to your account..")
        await Moralis.Cloud.run("claimCoins")
        coinScore = 0;
        user.set('coinScore', 0) 
        await user.save()
        text.setText(`Coins collected: ${coinScore}`); // set the text to show the current score
      } else {
        alert("Please mint a SNAIL to claim coins")
      }
  }

  async function collectCoin(player, coin) {
      coin.destroy(coin.x, coin.y); // remove the tile/coin
      coinScore ++; // increment the score

      // TODO: move to server when it's possible to modify user there
      user.set('coinScore', coinScore) 
      await user.save()

      await Moralis.Cloud.run("collectCoin", {x: coin.x/32, y: coin.y/32})
      text.setText(`Coins collected: ${coinScore}`); // set the text to show the current score
      return false;
  }

  async function getNFT () {
    return undefined; // TODO
    // Get NFTs data (Only Aavegotchis)
    const query = new Moralis.Query("PolygonNFTOwners") || Moralis.Query("EthNFTOwners");
    let nft = await query.equalTo("name", "Aavegotchi").first();
    if (!nft) nft = await query.first()
    if (!nft) return undefined
    if (!nft.get('token_uri')) return undefined

    const tokenData = await Moralis.Cloud.run("getTokenData", {tokenUri: nft.get('token_uri')});
    const rawSVG = tokenData.data.image_data
    const svgBlob = new Blob([rawSVG], {type:"image/svg+xml;charset=utf-8"})
    const url = URL.createObjectURL(svgBlob)
    console.log('url', url)
    return url
  }

  console.log('IonPhaser')

  console.log('IonPhaser INIT')
  //return <GameComponent config={config} />

  return (<IonPhaser ref={gameRef} game={config} />)
}


export function Leaderboard({ Moralis }) {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    async function init() {      
      const query = new Moralis.Query("User");
      let users = await query.descending().limit(10).find();
      setUsers(users)
    }
    init()
  })

  return (
    <div className="text-center mt-5">
      <h3>Leaderboard</h3>
      <div>
        {users.map(user => <div>Player {user.get('ethAddress')} has collected {user.get('coinScore')} $Snail Tokens</div>)}
      </div>
    </div>
  )

}

export const MemoizedGame = React.memo(Game)
