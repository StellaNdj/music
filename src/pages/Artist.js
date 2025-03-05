import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import { getArtist, getArtistAlbums, getArtistTopTrakcs } from "../Api";
import { AuthContext } from "../contexts/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

const Artist = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [artist, setArtist] = useState();
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  const limitChar = (string, max_length) => {
    return string.length > max_length ? string.slice(0, max_length) + '..' : string;
  }

  const capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const getArtistInfos = async () => {
      const response = await getArtist({ id, token })
      if (response) {
        setArtist(response);
      }
    };

    const getArtistTopTracksInfos = async () => {
      const response = await getArtistTopTrakcs({id, token})
      if (response) {
        setTopTracks(response.tracks);
      }
    };

    const getArtistAlbumsInfos = async () => {
      const response = await getArtistAlbums({id, token})
      if (response) {
        console.log(response.items);
        setAlbums(response.items);
      }
    };

    getArtistInfos();
    getArtistTopTracksInfos();
    getArtistAlbumsInfos();

  }, [id, token])

  if (!artist) return <p>Loading...</p>

  return(
    <>
      <div className="h-screen overflow-auto pb-16">
        {/* Artist infos */}
        <h2 className='font-bold text-2xl'>{artist.name}</h2>
        <p>{artist.followers.total} followers</p>
        <p>{artist.popularity} popularity</p>
        <img src={`${artist.images[0].url}`} alt={artist.name}/>

        {/* Artists top trakcs */}
        <div className='my-4'>
          <h2 className='text-2xl font-bold'>Top tracks</h2>
          {topTracks.map((track, index) =>
            <div key={track.id} className='flex'>
              <p className='p-1'>{index + 1}</p>
              <img src={`${track.album.images[0].url}`} alt={`${track.album.name}`} className='h-8'/>
              <p className='font-bold'>{track.name}</p>
              <p>{track.duration_ms / 60000}</p>
            </div>
          )}
        </div>

        {/* Artist albums */}
        <div className='my-4'>
        <h2 className='text-2xl font-bold'>Albums</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 3 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 9 },
            1280: { slidesPerView: 10 }
          }}
          navigation
          scrollbar={{ draggable: true }}
        >
          {albums.map((album) =>
            <SwiperSlide key={album.id}>
              <img src={`${album.images[0].url}`} alt={`${album.name}`} className="h-20 rounded-lg"/>
              <p>{limitChar(album.name, 20)}</p>
              <div className='flex'>
                <p className='font-bold'>{album.release_date.slice(0,4)} · </p>
                <p> {capitalizeFirst(album.album_type)}</p>
              </div>
            </SwiperSlide>
          )}

        </Swiper>
        </div>

      </div>
      <Navbar/>
    </>
  )
}

export default Artist;
