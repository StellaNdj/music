import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getAlbum } from "../Api";

const Album = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [album, setAlbum] = useState();

    useEffect(() => {
        const getAlbumInfos = async () => {
            const response = await getAlbum({token, id})
            if (response) {
                setAlbum(response);
            }
        }

        getAlbumInfos();
    }, [id, token]);

    if (!album) return <p>Loading...</p>

    return (
        <>
            <div className="h-screen overflow-auto pb-16">
                <div className="flex flex-col md:flex-row  p-4">
                    <div className="flex justify-center">
                        <img src={`${album.images[0].url}`} alt={album.name} className='h-28 w-28 '/>
                    </div>
                    <div>
                        <p>{album.type}</p>
                        <h2 className="font-bold">{album.name}</h2>  
                        <div className='flex flex-wrap'>
                            <p className="font-bold">{album.artists[0].name} · </p>
                            <p>{album.total_tracks} tracks ·</p>
                            <p>{album.release_date.slice(0,4)}</p>
                        </div> 
                    </div>
                </div>

                <div className='p-4 border-top border-bottom mx-2'>
                    <ul>
                        {album.tracks.items.map((track, index) =>
                            <li key={track.id}>{index + 1} {track.name}</li>
                        )}

                    </ul>
                </div>

                {/* Copyrights */}
                <div className="p-2 mx-2 text-sm text-gray-600">
                    <p>{album.copyrights[0].text}</p>
                </div>

            </div>
            <Navbar/>
        </>
    )
}

export default Album;