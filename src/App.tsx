
import './App.css'
import UserContext from './context/UserContext'
import { useState } from 'react'
import type { User } from "firebase/auth";
import Navbar from './Components/Navbar/Navbar';

function App() {

  const [user, setUser] = useState<User | null>(null);
  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <>
      <UserContext.Provider value={{ user, login, logout }}>
        <div className="min-h-screen flex flex-col sm:flex-row">
          <Navbar />

          <main className="flex-1 p-4 flex items-center justify-center bg-(--bg-primary)">
            Contents go here.
          </main>
        </div>

      </UserContext.Provider>
    </>
  )
}

export default App
