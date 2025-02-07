import React, { createContext, useState} from 'react';

export const Appcontext = createContext();

const AppContextProvider = (props) => {

        const [showLogin,setShowLogin] = useState(false)
        const [token,setToken] = useState(true)

        const logout = () => {
          setToken(false)
        }

        const value = {
          setShowLogin,showLogin,token,setToken,logout
        }
  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
