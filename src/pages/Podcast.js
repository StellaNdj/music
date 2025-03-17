import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getPodcast } from "../Api";
import { useParams } from "react-router-dom";

const Podcast = () => {
    const [podcast, setPodcast] = useState();
    const { token } = useContext(AuthContext);
    const { id } = useParams()

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
            <div>
                {podcast.images[0]?.url ? <img src={podcast.images[0].url} alt={podcast.name}/> : 'No image available'}
                <h2>{podcast.name}</h2>
                <p>{podcast.publisher}</p>
                <p>{podcast.description}</p>
            </div>
            <div>
                {podcast.episodes.items.map((episode) => 
                    <div>
                        <p>{episode.release_date}</p>
                        <p>{episode.name}</p>
                        <p>{(episode.duration_ms / 6000).toFixed()}</p>
                    </div>
                )}
            </div>

        </>
    )

}

export default Podcast;