import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { newReleases } from "../Api";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';

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
      <div className="mx-2">
        <h1 className="font-bold">Discover</h1>

        <h2 className='font-bold'>New releases tracks</h2>
        <div className='flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide'>
          {newReleasesData.map((album) =>
            <div key={album.id} className="shrink-0 snap-start">
              <img src={album.images[0].url} alt={album.name} className="rounded-lg w-20 md:w-30 lg:w-40" />
              <p className='font-bold text-sm'>{album.name}</p>
              <p className='text-xs'>{album.artists[0].name}</p>
            </div>
          )}
        </div>

        <h2 className='font-bold'>New Releases Tracks</h2>
        <Swiper slidesPerView={'auto'} spaceBetween={10}>
          {newReleasesData.map((album) => (
            <SwiperSlide key={album.id} className="w-auto">
              <img src={album.images[0].url} alt={album.name} className="w-20 md:w-30 lg:w-40" />
              <p className='font-bold text-sm'>{album.name}</p>
              <p className='text-xs'>{album.artists[0].name}</p>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
      <Navbar/>
    </>
  )
}

export default Home;
