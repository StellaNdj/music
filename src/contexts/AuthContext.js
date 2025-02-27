import { createContext, useEffect, useState } from 'react';
import { getToken } from '../Api';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem('spotifyToken')|| "");
  const [tokenTimestamp, setTokenTimestamp] = useState(
    localStorage.getItem('spotifyTokenTimestemp'|| null)
  );

  // Generating a new token, store token and timestamp
  const getNewToken = async () => {
    const new_token = await getToken();
    if (new_token) {
      const newTimestamp = Date.now();

      localStorage.setItem('spotifyToken', new_token);
      localStorage.setItem('spotifyTokenTimestamp', newTimestamp )

      setTokenTimestamp(newTimestamp);
      setToken(new_token);
    }
  }

  // Check token on page load and reset before expiration
  useEffect(() => {
    // Check if a token exist, if not get a new one, if it exist check if expired
    const checkToken = async () => {
      if (!token || !tokenTimestamp) {
        getNewToken();
      } else {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - tokenTimestamp) / 1000;
        const timeLeft = 3600 - elapsedTime;

        if (timeLeft <= 0) {
          getNewToken();
        } else {
          setTimeout(getNewToken, timeLeft * 1000 - 60000);
        }
      }
    }
    checkToken()
  }, [token, tokenTimestamp])

  return (
    <AuthContext.Provider value={{token}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
