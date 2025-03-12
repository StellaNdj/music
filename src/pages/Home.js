import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getArtists, newReleases } from "../Api";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { token } = useContext(AuthContext);
  const [newReleasesData, setNewReleasesData] = useState();
  const [artists, setArtists] = useState();
  const navigate = useNavigate();

  console.log(token);

  const limitChar = (string, max_length) => {
    return string.length > max_length ? string.slice(0, max_length) + '..' : string;
  }

  useEffect(() => {
    const fetchNewReleases = async () => {
      const response = await newReleases({token});
      if (response) {
        setNewReleasesData(response.albums.items);
      }
    };

    const fetchArtists = async () => {
      const response = await getArtists({token}) ;
      if (response) {
        setArtists(response.artists);
      }
    }
    fetchNewReleases();
    fetchArtists();
  }, [token])

  const goToArtist = (id) => {
    navigate(`artist/${id}`);
  }

  const goToAlbum = (id) => {
    navigate(`album/${id}`)
  }

  if (!newReleasesData) return <p>Loading...</p>

  return (
    <>
      <div className="mx-2">
        <h1 className="font-bold text-center">Discover</h1>
        <div className='my-2'>
          <h2 className='font-bold'>New Releases Tracks</h2>
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
            {newReleasesData.map((album) => (
              <SwiperSlide key={album.id} className="w-auto" onClick={() => goToAlbum(album.id)}>
                <img src={album.images[0].url} alt={album.name} className="rounded-lg w-20 md:w-30 lg:w-40" />
                <p className='font-bold text-sm'>{limitChar(album.name, 10)}</p>
                <p className='text-xs' onClick={() => goToArtist(album.artists[0].id)}>{album.artists[0].name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='my-2'>
          <h2 className='font-bold'>Top artists</h2>
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
            {artists.map((artist) => (
              <SwiperSlide
                key={artist.id}
                className="w-auto flex flex-col items-center"
                onClick={() => goToArtist(artist.id)}>
                <img src={artist.images[0].url} alt={artist.name} className="rounded-full w-20 md:w-30 lg:w-40" />
                <p className='font-bold text-sm'>{artist.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
      <Navbar/>
    </>
  )
}

export default Home;
