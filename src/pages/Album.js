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
                console.log(response);
                setAlbum(response);
            }
        }

        getAlbumInfos();
    }, [id, token]);

    if (!album) return <p>Loading...</p>

    return (
        <>
            <div className="h-screen overflow-auto pb-16">
                <div>
                    <img src={`${album.images[0].url}`} alt={album.name}/>
                    <p>{album.type}</p>
                    <h2>{album.name}</h2>   
                    <p>{album.artists.name} ·</p>
                    <p>{album.total_tracks} tracks</p>
                    <p>{album.release_date.slice(0,4)}</p>
                </div>

                <div>
                    <ul>
                        {album.tracks.items.map((track, index) =>
                            <li key={track.id}>{index + 1} {track.name}</li>
                        )}

                    </ul>
                </div>

            </div>
            <Navbar/>
        </>
    )
}

export default Album;