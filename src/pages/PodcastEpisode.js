import { useContext, useEffect, useRef, useState } from "react";
import { getPodcastEpisode } from "../Api";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

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

    if (!podcastEpisode) return <p>Loading...</p>

    return (
        <>
            <div className="mx-2 overflow-auto pb-16">
                {podcastEpisode.images[0]?.url ? <img src={podcastEpisode.images[0].url} alt={podcastEpisode.name}/> : <p>No image available</p>}
                <p>{podcastEpisode.release_date}</p>
                <h2>{podcastEpisode.name}</h2>
                <p>{podcastEpisode.duration_ms}</p>
                <p>{podcastEpisode.description}</p>
                <p>{podcastEpisode.audio_preview_url}</p>
                <p>{podcastEpisode.explicit ? 'Explicit' : ''}</p>
            </div>
        </>
    )
}

export default PodcastEpisode;