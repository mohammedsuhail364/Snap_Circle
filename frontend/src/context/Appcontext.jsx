import React, { createContext, useState} from 'react';

export const Appcontext = createContext();

const AppContextProvider = (props) => {

        const [showLogin,setShowLogin] = useState(false)
        const [token,setToken] = useState(false)
        const [user, setUser] = useState(null);
        const logout = () => {
          sessionStorage.clear('token');
          sessionStorage.clear('user');
          setToken(false);
          setUser(null);
        }

        const value = {
          setShowLogin,
          showLogin,
          token,
          setToken,
          logout,
          user,
          setUser
        }
  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
