import { createContext, useState } from 'react';
import { getToken } from '../Api';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken')|| "");

  const setApiToken = async () => {
    // Get token
    const tokenfetch = await getToken();
  }

  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
