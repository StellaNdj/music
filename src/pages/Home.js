import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { newReleases } from "../Api";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [newReleasesData, setNewReleasesData] = useState();

  useEffect(() => {
    const fetchNewReleases = async () => {
      const response = await newReleases({token});
      if (response) {
        console.log(response.albums.items);
        setNewReleasesData(response.albums.items);
      }
    };
    fetchNewReleases();
  }, [token])

  if (!newReleasesData) return <p>Loading...</p>

  return (
    <>
      <h1>Music Discovery App</h1>
      <div className='flex'>
        {newReleasesData.map((album) =>
          <div key={album.id}>
            <img src={album.images[0].url} alt={album.name}></img>
            <p>{album.name}</p>
            <p>{album.artists[0].name}</p>
            <p>{album.release_date}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Home;
