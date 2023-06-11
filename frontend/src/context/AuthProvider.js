import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userId, setUserId] = useState(null);
  const [refreshTodolist, setRefreshTodolist] = useState(1);

  useEffect(() => {
    // Check if login state is stored in localStorage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');

    if (storedIsLoggedIn && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  // const login = () => {
  //   setIsLoggedIn(true);
  // };

  const login = () => {
    setIsLoggedIn(true);
  };

  // const logout = () => {
  //   setIsLoggedIn(false);
  // };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  };

  const handleTodoCreated = () => {
    setRefreshTodolist(state => !state);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, setUserId, refreshTodolist, handleTodoCreated}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;