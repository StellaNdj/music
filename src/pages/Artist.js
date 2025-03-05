import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import { getArtist, getArtistTopTrakcs } from "../Api";
import { AuthContext } from "../contexts/AuthContext";

const Artist = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [artist, setArtist] = useState();
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const getArtistInfos = async () => {
      const response = await getArtist({ id, token })
      if (response) {
        console.log(response);
        setArtist(response);
      }
    };

    const getArtistTopTracksInfos = async () => {
      const response = await getArtistTopTrakcs({id, token})
      if (response) {
        console.log(response.tracks);
        setTopTracks(response.tracks);
      }
    };

    getArtistInfos();
    getArtistTopTracksInfos();

  }, [id, token])

  if (!artist) return <p>Loading...</p>

  return(
    <>
      {/* Artist infos */}
      <h2 className='font-bold text-2xl'>{artist.name}</h2>
      <p>{artist.followers.total} followers</p>
      <p>{artist.popularity} popularity</p>
      <img src={`${artist.images[0].url}`} alt={artist.name}/>

      {/* Artists top trakcs */}
      <div>
        {topTracks.map((track, index) =>
          <div key={track.id} className='flex'>
            <p>{index + 1}</p>
            <img src={`${track.album.images[0].url}`} alt={`${track.album.name}`} className='h-8'/>
            <p className='font-bold'>{track.name}</p>
            <p>{track.duration_ms}</p>
          </div>
        )}
      </div>
      <Navbar/>
    </>
  )
}

export default Artist;
