import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);


  return (
    <AppContext.Provider value={{ user, setUser, movies, setMovies }}>
      {children}
    </AppContext.Provider>
  );
  
};


export const useAppContext = () => useContext(AppContext);
