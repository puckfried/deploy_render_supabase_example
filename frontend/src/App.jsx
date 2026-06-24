import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const URL_BACKEND = "https://ilp-example-backend.onrender.com"
  // const URL_BACKEND = "http://localhost:3000"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function handleLogout(){
    const res = await fetch(`${URL_BACKEND}/logout`, {credentials: "include"})
    if (res.ok) setIsLoggedIn(false)
  }
  

  async function handleSubmit(e){
    e.preventDefault()
    const response = await fetch(`${URL_BACKEND}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password, username:user}),
    });

    const data = await response.json();
    console.log(data);

  }

  useEffect(()=> {
    const checkAuth = async() =>{
       const res = await fetch(`${URL_BACKEND}/getUser`, {credentials: "include"})
       if (res.ok) setIsLoggedIn(true)
    }
  checkAuth()
  }, [])

  return (
    <>
      {isLoggedIn ? 
        <>
          <h1>Logged In</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
        :
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="user">Username</label>
            <input type="text" id='user' value={user} onChange={(e) => setUser(e.target.value)} />

          </div>
          <div>
            <label htmlFor="pw">Passwort</label>
            <input type="text" id='pw' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button>Abschicken</button>
        </form>
        }
      
      
    </>
  )
}

export default App
