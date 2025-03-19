import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { getAudiobookChapter } from "../Api";
import StickyHeader from "../components/StickyHeader";

const AudiobookChapter = () => {
    const [audiobookChapter, setAudiobookChapter] = useState();
    const {token} = useContext(AuthContext);
    const {id} = useParams();
    const titleRef = useRef();

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

    
    const formatDuration = (time_ms) => {
        const totalMinutes = Math.floor(time_ms / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }

    if (!audiobookChapter) return <p>Loading...</p>

    return (
        <>  
            <div>
                <div>
                    <StickyHeader title={audiobookChapter.name} titleRef={titleRef}/>
                    <div
                        className="w-full h-60 flex items-center bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${audiobookChapter.images[0]?.url})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="relative z-10 p-6 text-white">
                            <h2 ref={titleRef} className="font-bold text-2xl">{audiobookChapter.name}</h2>
                        </div>
                    </div>
                </div>
                <div className="mx-2">
                    <p>{audiobookChapter.release_date}</p>
                    <p>{formatDuration(audiobookChapter.duration_ms)}</p>
                    <p>{audiobookChapter.explicit ? 'Explicit' : ''}</p>
                    <p>{audiobookChapter.audio_preview_url ? audiobookChapter.audio_preview_url : 'No preview'}</p>
                </div>   
            </div>
        </>
    )
}

export default AudiobookChapter;