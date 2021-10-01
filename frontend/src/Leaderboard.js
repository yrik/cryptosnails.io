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
