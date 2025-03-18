import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { getAudiobookChapter } from "../Api";

const AudiobookChapter = () => {
    const [audiobookChapter, setAudiobookChapter] = useState();
    const {token} = useContext(AuthContext);
    const {id} = useParams();

    useEffect(() => {
        const getAudiobookChapterInfos = async () => {
            const response = await getAudiobookChapter({token, id})
            if (response) {
                console.log(response)
                setAudiobookChapter(response)
            }
        };
        getAudiobookChapterInfos();
    }, [token, id])

    if (!audiobookChapter) return <p>Loading...</p>

    return (
        <>  
            {audiobookChapter.images[0]?.url ? <img src={audiobookChapter.images[0].url} alt={audiobookChapter.name}/> : <p>No image available</p>}
            <h2>{audiobookChapter.name}</h2>
            <p>{audiobookChapter.release_date}</p>
            <p>{audiobookChapter.duration_ms}</p>
            <p>{audiobookChapter.explicit ? 'Explicit' : ''}</p>
            <p>{audiobookChapter.audio_preview_url ? audiobookChapter.audio_preview_url : 'No preview'}</p>
        </>
    )
}

export default AudiobookChapter;