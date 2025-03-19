import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getPodcast } from "../Api";
import { useParams } from "react-router-dom";
import useNavigation from "../utils/navigationHelpers";
import StickyHeader from "../components/StickyHeader";
import TopSection from "../components/TopSection";

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
            <div className="overflow-auto pb-16">
                <StickyHeader title={podcast.name} titleRef={titleRef}/>

                <TopSection more={more} name={podcast.name} titleRef={titleRef} publisher={podcast.publisher} imageUrl={podcast.images[0]?.url} limitChar={limitChar} description={podcast.description} setMore={setMore} />

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