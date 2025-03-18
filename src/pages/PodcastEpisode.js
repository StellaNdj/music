import { useContext, useEffect, useState } from "react";
import { getPodcastEpisode } from "../Api";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

const PodcastEpisode = () => {
    const [podcastEpisode, setPodcastEpisode] = useState();
    const { token } = useContext(AuthContext);
    const { id } = useParams();

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
            <div>
                {podcastEpisode.images[0]?.url ? <img src={podcastEpisode.images[0].url} alt={podcastEpisode.name}/> : <p>No image available</p>}
                <p>{podcastEpisode.release_date}</p>
                <p>{podcastEpisode.name}</p>
                <p>{podcastEpisode.duration_ms}</p>
                <p>{podcastEpisode.description}</p>
                <p>{podcastEpisode.audio_preview_url}</p>
                <p>{podcastEpisode.explicit ? 'Explicit' : ''}</p>
            </div>
        </>
    )
}

export default PodcastEpisode;