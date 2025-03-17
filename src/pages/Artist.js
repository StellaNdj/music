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
import useNavigation from "../utils/navigationHelpers";

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
        console.log(response.tracks);
        setTopTracks(response.tracks);
      }
    };

    const getArtistAlbumsInfos = async () => {
      const response = await getArtistAlbums({id, token})
      if (response) {
        setAlbums(response.items);
      }
    };

    getArtistInfos();
    getArtistTopTracksInfos();
    getArtistAlbumsInfos();

  }, [id, token])

  const {goToAlbum} = useNavigation();

  if (!artist) return <p>Loading...</p>

  return(
    <>
      <div className="mx-2 h-screen overflow-auto pb-16">
        {/* Artist Banner */}
        <div
          className="w-full h-60 flex items-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${artist.images[0].url})` }}
        >
          {/* Overlay to improve text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content Section */}
          <div className="relative z-10 p-6 text-white">
            <h2 className="font-bold text-6xl">{artist.name}</h2>
            <p>{artist.followers.total.toLocaleString()} followers</p>
          </div>
        </div>

        {/* Artists top trakcs */}
        <div className='m-4 p-2'>
          <h2 className='text-2xl font-bold'>Top tracks</h2>
          <div className='p-2'>
            {topTracks.map((track, index) =>
              <div key={track.id} className='flex rounded-md cursor-pointer hover:bg-gray-300 p-1 w-full'>
                <p className='w-6 text-center font-bold'>{index + 1}</p>
                <img src={`${track.album.images[0].url}`} alt={`${track.album.name}`} className='h-11   rounded-md'/>
                <div className="ml-2 flex-1 min-w-0">
                  <p className='font-bold truncate'>{track.name}</p>
                  {track.explicit ? <p className="text-sm bg-gray-200 rounded-md w-fit px-2 ">E</p> : ''}
                </div> 
                <p>{(track.duration_ms / 60000).toFixed(2).replace('.', ':')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Artist albums */}
        <div className='m-4'>
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
            <SwiperSlide key={album.id} onClick={() => goToAlbum(album.id)}>
              <img src={`${album.images[0].url}`} alt={`${album.name}`} className="h-36 rounded-lg"/>
              <p>{limitChar(album.name, 20)}</p>
              <div className='flex text-sm'>
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
