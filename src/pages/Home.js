import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getArtists, newReleases } from "../Api";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import useNavigation from "../utils/navigationHelpers";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [newReleasesData, setNewReleasesData] = useState();
  const [artists, setArtists] = useState();
  const [spinning, setSpinning] = useState(true);

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

    const timer = setTimeout(() => setSpinning(false), 5000);
    return () => clearTimeout(timer);
  }, [token])
    
  const { goToArtist, goToAlbum } = useNavigation();


  if (!newReleasesData) return <p>Loading...</p>

  return (
    <>
      <div className="mx-2 h-screen overflow-auto pb-16">
        <h1 className="font-bold text-center my-4">Home</h1>

        {/* Banner 1 */}
        <div className="bg-blue-600 rounded-lg p-4 relative h-40">
          <p className='font-bold text-white text-4xl md:text-6xl lg:text-7xl p-2 w-[15rem] md:w-full lg:w-full text-start md:text-center lg:text-center'>Find your next favorite song</p>
          <img src='vinyl.png' alt='vinyl banner img' className={`w-28 absolute bottom-0 right-0 transition-transform ${spinning ? "animate-spin" : ""}`} />
        </div>

        {/* Top albums */}
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
              <SwiperSlide key={album.id} className="w-auto rounded-md p-1 hover:bg-gray-500 cursor-pointer " onClick={() => goToAlbum(album.id)}>
                <div className="flex justify-center">
                  <img src={album.images[0].url} alt={album.name} className="rounded-lg w-24 md:w-30 lg:w-40" />
                </div>
                <div className="ml-3">
                  <p className='font-bold text-sm cursor-pointer hover:underline'>{limitChar(album.name, 10)}</p>
                  <p className='text-xs cursor-pointer hover:underline' 
                    onClick={(e) =>{ 
                    e.stopPropagation()
                    goToArtist(album.artists[0].id)}}>
                    {album.artists[0].name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Banner 2 */}
        <div className="bg-red-600 rounded-lg p-4 relative h-40">
          <p className='font-bold text-white text-4xl ml-2 md:text-6xl lg:text-7xl p-2 w-[15rem] md:w-full lg:w-full text-end md:text-center lg:text-center'>Find your album</p>
          <img src='album.png' alt='vinyl banner img' className={`w-28 absolute bottom-0 left-0 p-1`} />
        </div>

        {/* Top artists */}
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
                className="w-auto flex flex-col items-center rounded-md p-1 hover:bg-gray-500 cursor-pointer"
                onClick={() => goToArtist(artist.id)}>
                <div className="flex justify-center">
                  <img src={artist.images[0].url} alt={artist.name} className="rounded-full w-22 md:w-30 lg:w-40" />
                </div>
                <div className="ml-3">
                  <p className='font-bold text-sm cursor-pointer hover:underline'>{artist.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </>
  )
}

export default Home;
