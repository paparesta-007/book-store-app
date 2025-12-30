import { createContext } from "react";
import type { User } from "firebase/auth";


interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {
    
   },
  logout: () => { },
});
export default UserContext