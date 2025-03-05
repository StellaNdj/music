import axios from 'axios';
// Spotify base url
const baseUrl = "https://api.spotify.com/v1/";

// Generate token via credentials
export const getToken = async () => {
  try {
    const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

    const response = await axios.post(`https://accounts.spotify.com/api/token`,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          'Authorization': `Basic ${btoa(`${clientID}:${client_secret}`)}`,
          'Content-Type': "application/x-www-form-urlencoded",
        }
      }
    )
    return response.data.access_token;
  } catch (error) {
    console.log('Error while generating a token', error)
  }
};

// Get new releases
export const newReleases = async ({token}) => {
  try {
    const response = await axios.get(`${baseUrl}browse/new-releases`,
      {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      }
    )
    return response.data;
  } catch (error) {
    console.log('Error while getting new release', error)
  }
}

// Get multiple artists
export const getArtists = async ({token}) => {
  try {
    const response = await axios.get(`${baseUrl}artists?ids=6qqNVTkY8uBg9cP3Jd7DAH,74KM79TiuVKeVCqs8QtB0B,66CXWjxzNUsdJxJ2JdwvnR,1uNFoZAHBGtllmzznpCI3s,26VFTg2z8YR0cCuwLzESi2,6eUKZXaKkcviH0Ku9w2n3V,4dpARuHxo51G3z768sgnrY,5pKCCKE2ajJHZ9KAiaK11H,6vWDO969PvNqNYHIOW5v0m,2dIgFjalVxs4ThymZ67YCE,3Nrfpe0tUJi4K4DXYWgMUX,41MozSoPIsD1dJM0CLPjZF,6HaGTQPmzraVmaVxvz6EUc,3eVa5w3URK5duf6eyVDbu9`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log('Error while getting multiple artists', error)
  }
}

// Get artist infos
export const getArtist = async ({token, id}) => {
  try {
    const response = await axios.get(`${baseUrl}artists/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log('Error while getting artist infos', error)
  }
}

// Get artist top tracks
export const getArtistTopTrakcs = async ({token, id}) => {
  try {
    const response = await axios.get(`${baseUrl}artists/${id}/top-tracks`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log('Error while getting artist top tracks', error)
  }
}

// Get artist albums
export const getArtistAlbums = async ({token, id}) => {
  try {
    const response = await axios.get(`${baseUrl}artists/${id}/albums`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log('Error while getting artist album', error)
  }
}
