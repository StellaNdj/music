import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getPodcast } from "../Api";
import { useParams } from "react-router-dom";
import useNavigation from "../utils/navigationHelpers";
import StickyHeader from "../components/StickyHeader";

const Podcast = () => {
    const [podcast, setPodcast] = useState();
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const titleRef = useRef(null);
    const { goToPodcastEpisode } = useNavigation();
    const [more, setMore] = useState(false);

    const formatDuration = (time_ms) => {
        const totalMinutes = Math.floor(time_ms / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }

    const limitChar = (string, max_length) => {
        return string.length > max_length ? string.slice(0, max_length) + '..' : string;
      }

    useEffect(() => {
        const getPodcastInfos = async () => {
            const response = await getPodcast({token, id})
            if (response) {
                console.log(response);
                setPodcast(response);
            }
        }
        getPodcastInfos();
    }, [id, token])


    if (!podcast) return <p>Loading...</p>

    return(
        <>
            <div className="mx-2 overflow-auto pb-16">
                <StickyHeader title={podcast.name} titleRef={titleRef}/>
                <div
                    className="w-full h-60 flex items-center bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${podcast.images[0]?.url})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="relative z-10 p-6 text-white">
                        <h2 ref={titleRef} className="font-bold text-2xl">{podcast.name}</h2>
                        <p>{podcast.publisher}</p>
                    </div>
                </div>
                <div className="mx-2 p-2">
                    {more ? <p className="text-sm">{podcast.description}</p> : <p className="text-sm">{limitChar(podcast.description, 150)}</p> }
                    <button 
                        className="text-gray-700 text-sm hover:underline ml-1"
                        onClick={() => setMore(!more)}>
                        {more ? 'Less' : 'More'}
                    </button>
                    
                </div>
                <div className="mx-2">
                    {podcast.episodes.items.map((episode) => 
                        <div key={episode.id} onClick={() => goToPodcastEpisode(episode.id)} className="flex hover:bg-gray-500 cursor-pointer p-4 rounded-lg" >
                            <img src={episode.images[0]?.url} alt={episode.name} className='w-20 h-20 rounded-lg' />
                            <div className="ml-2 ">
                                <p className="text-sm">{episode.release_date}</p>
                                <p className="font-bold">{limitChar(episode.name, 30)}</p>
                                <p className="text-sm">{formatDuration(episode.duration_ms)}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}

export default Podcast;