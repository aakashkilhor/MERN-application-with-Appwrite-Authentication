import { useState } from 'react';
import AuthContext from './AuthContext';

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, setUserId }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;