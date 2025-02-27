import axios from 'axios';

// Generate token via credentials
export const getToken = () => {
  try {
    const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

    const response = axios.post(`https://accounts.spotify.com/api/token`,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          'Authorization': `Basic ${btoa(`${clientID}:${client_secret}`)}`,
          'Content-Type': "application/x-www-form-urlencoded",
        }
      }
    )
    console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.log('Error while generating a token', error)
  }
};
