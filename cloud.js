i
Moralis.Cloud.define("claimCoins", async (request) => {
  
  // TODO: send coins to the user

},
{
  requireUser: true
});

Moralis.Cloud.define("collectCoin", async (request) => {
  const coinQuery = new Moralis.Query("Coin");
  coinQuery.equalTo("x", request.params.x).equalTo("y", request.params.y);
  const coin = await coinQuery.first();
  await coin.destroy()
 
  /*
  const userQuery = new Moralis.Query("User");
  const ethAddress = request.user.get("ethAddress")
  const user = await userQuery.equalTo("ethAddress", ethAddress).first();
  return [ethAddress, user]

  const user = request.user
  user.set('coinScore', user.get('coinScore') + 1)
  await user.save()
    */
},
{
  fields : ['x', 'y'],
  requireUser: true
});

Moralis.Cloud.job("generateCoins", async (request) =>  {
	let levelQuery = new Moralis.Query('Level')
    const level = await levelQuery.descending("createdAt").first()
    const starsCount = Math.floor(level.get('size') * 0.2);
  	const indexes = [...Array(level.get('size')).keys()]

    const Coin = Moralis.Object.extend("Coin");
  
  	for (let i=0; i < starsCount; i++) {
    	const x = Math.floor(Math.random()*75)
        const y = Math.floor(Math.random()*75)
        if (level.get('data')[x][y] == undefined) {
            // TODO: exclude already existing coins
            const coin = new Coin();
            coin.set('x', x)
            coin.set('y', y)    
            await coin.save()
        }
    }
});


Moralis.Cloud.job("generateLevel", async (request) =>  {
	const levelSize = 75
  	const indexes = [...Array(levelSize).keys()]
  	const data = indexes.map( row => indexes.map( col => {
		if (row % 4 == Math.floor(Math.random() * 2) && col % Math.floor(Math.random() * 5) == 0) {
          return 8
        }
	}))
  
  	const Level = Moralis.Object.extend("Level");
  	const level = new Level();
  	level.set('data', data)
   	level.set('size', levelSize)
  	await level.save();
  
    // Delete all old coins on the map
  
});

