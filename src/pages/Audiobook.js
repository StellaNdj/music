import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { getAudiobook } from "../Api";
import useNavigation from "../utils/navigationHelpers";
import StickyHeader from "../components/StickyHeader";
import TopSection from "../components/TopSection";

const Audiobook = () => {
    const [audiobook, setAudiobook] = useState();
    const {token} = useContext(AuthContext);
    const {id} = useParams();
    const titleRef = useRef(null);
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
        const getAudiobookInfos = async () => {
            const response = await getAudiobook({token, id})
            if (response) {
                console.log(response);
                setAudiobook(response)
            }
        };
        getAudiobookInfos();
    }, [id, token])
    
    const { goToAudiobookChapter } = useNavigation();

    if (!audiobook) return <p>Loading...</p>

    return(
        <>
            <div className="mx-2 overflow-auto pb-16">
                <StickyHeader title={audiobook.name} titleRef={titleRef}/>

                <TopSection more={more} setMore={setMore} titleRef={titleRef} limitChar={limitChar} name={audiobook.name} publisher={audiobook.publisher} description={audiobook.description} imageUrl={audiobook.images[0]?.url} />
            </div>
            <div className="mx-2">
                {audiobook.chapters.items.map((chapter) => 
                    <div key={chapter.id} onClick={() => goToAudiobookChapter(chapter.id)} className='flex hover:bg-gray-500 cursor-pointer p-4 rounded-lg'>
                        {chapter.images[0]?.url ? <img src={chapter.images[0]?.url} alt={chapter.image} className='w-20 h-20 rounded-lg'/> : <p>No image available</p>}
                        <div className="ml-2">
                            <p className="font-bold">{limitChar(chapter.name, 30)}</p>
                            <p>{formatDuration(chapter.duration_ms)}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}

export default Audiobook;