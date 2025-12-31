import './App.css'
import UserContext from './context/UserContext'
import { useState, useEffect } from 'react'
import type { User } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiscoverPage from './Components/DiscoverPage/DiscoverPage';
import SearchPage from './Components/Searchpage/SearchPage';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./library/firebase";
import Login from './Components/Login/Login';
import MainLayout from './Components/Layout/MainLayout';
import BookDetails from './Components/BookDetails/BookDetails';

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
    return <div className="flex items-center justify-center min-h-screen bg-(--bg-primary)">
      <div className="loader"></div>
      </div>;
  }


  return (
    <UserContext.Provider value={{ user, login, logout }}>


      <Router>
        <Routes>
          {/* ROTTE CON NAVBAR */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<DiscoverPage />} />
            <Route path="/my-space" element={<h2>My Space Page</h2>} />
            <Route path="/categories" element={<h2>Categories Page</h2>} />
            <Route path="/wishlist" element={<h2>Wishlist Page</h2>} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path='/book/:id' element={<BookDetails  />} />
          </Route>

          {/* ROTTA SENZA NAVBAR */}
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
