import './App.css'
import UserContext from './context/UserContext'
import { useState, useEffect } from 'react'
import type { User } from "firebase/auth";
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Navbar/Header/Header';
import DiscoverPage from './Components/DiscoverPage/DiscoverPage';
import SearchPage from './Components/Searchpage/SearchPage';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./library/firebase";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (initializing) {
    return <div className="loading">Caricamento...</div>;
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="min-h-screen flex flex-col sm:flex-row">
          <Navbar />

          <main className="flex-1 p-4 flex bg-(--bg-primary) flex-col items-center">
            <Header />
            <div className="w-full mt-4 flex-1 p-4 rounded-lg border border-gray-400">
              <Routes>
                <Route path="/" element={<DiscoverPage />} />
                <Route path="/my-space" element={<h2>My Space Page</h2>} />
                <Route path="/categories" element={<h2>Categories Page</h2>} />
                <Route path="/wishlist" element={<h2>Wishlist Page</h2>} />
                <Route path="/search/:query" element={<SearchPage />} />
                <Route path="*" element={<h2>404 - Page Not Found</h2>} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
