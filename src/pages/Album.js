import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getAlbum } from "../Api";
import StickyHeader from "../components/StickyHeader";
import useNavigation from "../utils/navigationHelpers";

const Album = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [album, setAlbum] = useState();
    const titleRef = useRef(null);

    useEffect(() => {
        const getAlbumInfos = async () => {
            const response = await getAlbum({token, id})
            if (response) {
                setAlbum(response);
            }
        }

        getAlbumInfos();
    }, [id, token]);

    const {goToArtist} = useNavigation();

    if (!album) return <p>Loading...</p>

    return (
        <>
            <div className="mx-2 overflow-auto pb-36">
                <StickyHeader title={album.name} titleRef={titleRef}/> 

                <div className="flex flex-col md:flex-row  p-4">
                    <div className="flex justify-center">
                        <img src={`${album.images[0]?.url}`} alt={album.name} className='h-28 w-28 rounded-lg'/>
                    </div>
                    <div>
                        <h2 ref={titleRef} className="font-bold text-center">{album.name}</h2>
                        <h3 className='font-bold text-center hover:underline' onClick={() => goToArtist(album.artists[0].id)}>{album.artists[0].name}</h3> 
                        <div className='flex flex-wrap justify-center'>
                            <p className="mr-1">{album.type === 'album' ? 'Album': album.type} ·</p>
                            <p className="mr-1">{album.total_tracks} {album.total_tracks > 1 ? 'songs' : 'song'} ·</p>
                            <p>{album.release_date.slice(0,4)}</p>
                        </div> 
                    </div>
                </div>

                <div className='p-4 border-t border-b mx-2'>
                        {album.tracks.items.map((track, index) =>
                            <div key={track.id} className="flex">
                                <p className='w-6 text-center text-gray-700 mr-2'>{index + 1}</p> 
                                <p>{track.name}</p>
                            </div>
                        )}

                </div>

                {/* Copyrights */}
                <div className="p-2 mx-2 text-sm text-gray-600">
                    <p>{album.copyrights[0].text}</p>
                    <p>{album.label}</p>
                </div>

            </div>
        </>
    )
}

export default Album;