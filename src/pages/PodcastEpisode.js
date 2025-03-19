import { useContext, useEffect, useRef, useState } from "react";
import { getPodcastEpisode } from "../Api";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import StickyHeader from "../components/StickyHeader";

const PodcastEpisode = () => {
    const [podcastEpisode, setPodcastEpisode] = useState();
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const titleRef = useRef(null);

    useEffect(() => {
        const getPodcastEpisodeInfos = async () => {
            const response = await getPodcastEpisode({token, id})
            if (response) {
                setPodcastEpisode(response);
            }
        };
        getPodcastEpisodeInfos();
    }, [id, token]);

    const formatDuration = (time_ms) => {
        const totalMinutes = Math.floor(time_ms / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }


    if (!podcastEpisode) return <p>Loading...</p>

    return (
        <>
            <div className="overflow-auto pb-16">
                <div>
                    <StickyHeader title={podcastEpisode.name} titleRef={titleRef} />
                    <div
                        className="w-full h-60 flex items-center bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${podcastEpisode.images[0]?.url})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="relative z-10 p-6 text-white">
                            <h2 ref={titleRef} className="font-bold text-2xl">{podcastEpisode.name}</h2>
                        </div>
                    </div>
                </div>
                <div className='mx-2'>
                    <p>{podcastEpisode.release_date}</p>
                    <p>{formatDuration(podcastEpisode.duration_ms)}</p>
                    <p>{podcastEpisode.description}</p>
                    <p>{podcastEpisode.audio_preview_url}</p>
                    <p>{podcastEpisode.explicit ? 'Explicit' : ''}</p>
                </div>
            </div>
        </>
    )
}

export default PodcastEpisode;