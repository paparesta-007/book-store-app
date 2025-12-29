import './App.css'
import UserContext from './context/UserContext'
import { useState } from 'react'
import type { User } from "firebase/auth";
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Navbar/Header/Header';
import DiscoverPage from './Components/DiscoverPage/DiscoverPage';
import SearchPage from './Components/Searchpage/SearchPage';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="min-h-screen flex flex-col sm:flex-row">
          <Navbar />

          <main className="flex-1 p-4 flex flex-col items-center bg-(--bg-primary)">
            <Header />
            <div className="w-full mt-4 flex-1 bg-(--bg-primary) p-4 rounded-lg border border-gray-400">
              <Routes>
                <Route path="/" element={<DiscoverPage />} />
                <Route path="/my-space" element={<h2 className="text-2xl">My Space Page</h2>} />
                <Route path="/categories" element={<h2 className="text-2xl">Categories Page</h2>} />
                <Route path="/wishlist" element={<h2 className="text-2xl">Wishlist Page</h2>} />
                <Route path='/search/:query' element={<SearchPage/>} />
                {/* 404 Route */}
                <Route path="*" element={<h2 className="text-2xl">404 - Page Not Found</h2>} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
