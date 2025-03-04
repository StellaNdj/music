import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getArtists, newReleases } from "../Api";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

const Home = () => {
  const { token } = useContext(AuthContext);
  const [newReleasesData, setNewReleasesData] = useState();
  const [artists, setArtists] = useState();

  console.log(token);

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
        console.log(response.artists);
        setArtists(response.artists);
      }
    }
    fetchNewReleases();
    fetchArtists();
  }, [token])

  if (!newReleasesData) return <p>Loading...</p>

  return (
    <>
      <div className="mx-2">
        <h1 className="font-bold">Discover</h1>

        <div>
          <h2 className='font-bold'>New Releases Tracks</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
            scrollbar={{ draggable: true }}
          >
            {newReleasesData.map((album) => (
              <SwiperSlide key={album.id} className="w-auto">
                <img src={album.images[0].url} alt={album.name} className="rounded-lg w-20 md:w-30 lg:w-40" />
                <p className='font-bold text-sm'>{album.name}</p>
                <p className='text-xs'>{album.artists[0].name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <h2 className='font-bold'>Top artists</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
            scrollbar={{ draggable: true }}
          >
            {artists.map((artist) => (
              <SwiperSlide key={artist.id} className="w-auto">
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
