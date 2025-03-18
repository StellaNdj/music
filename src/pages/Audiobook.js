import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { getAudiobook } from "../Api";
import useNavigation from "../utils/navigationHelpers";
import StickyHeader from "../components/StickyHeader";

const Audiobook = () => {
    const [audiobook, setAudiobook] = useState();
    const {token} = useContext(AuthContext);
    const {id} = useParams();
    const titleRef = useRef(null);

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
                {audiobook.images[0]?.url ? <img src={audiobook.images[0]?.url} alt={audiobook.name}/> : <p>No image available</p>}
                <h2 ref={titleRef}>{audiobook.name}</h2>
                <p>{audiobook.publisher}</p>
                <p>{audiobook.description}</p>
                <p>{audiobook.explicit ? 'Explicit': ''}</p>
            </div>
            <div>
                {audiobook.chapters.items.map((chapter) => 
                    <div key={chapter.id} onClick={() => goToAudiobookChapter(chapter.id)} className='cursor-pointer'>
                        {chapter.images[0]?.url ? <img src={chapter.images[0]?.url} alt={chapter.image}/> : <p>No image available</p>}
                        <p>{chapter.name}</p>
                        <p>{(chapter.duration_ms / 6000)}</p>
                    </div>
                )}
            </div>
        </>
    )

}

export default Audiobook;