import { createContext } from 'react';

const AuthContext = createContext();

export default AuthContext;

// function AuthProvider(props) {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//     const login = () => {
//       setIsLoggedIn(true);
//     };
  
//     const logout = () => {
//       setIsLoggedIn(false);
//     };
  
//     return (
//       <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//         {props.children}
//       </AuthContext.Provider>
//     );
//   }