import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { getAAATP } from "../Api";
import { AuthContext } from "../contexts/AuthContext";
import useNavigation from "../utils/navigationHelpers";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = () => {
    const [form, setForm] = useState({
        search: '',
        type: '',
    });

    const [podcasts, setPodcasts] = useState([]);
    const [audiobooks, setAudiobooks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);

    const { token } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const search = form.search.trim().toLocaleLowerCase().replaceAll(" ", "_");

        const response = await getAAATP({token: token, search: search, type: form.type})

        if (response) {
            if (response.shows) {
                setPodcasts(response.shows.items)
            }

            if (response.audiobooks) {
                setAudiobooks(response.audiobooks.items)
            }

            if (response.artists) {
                setArtists(response.artists.items)
            }

            if (response.albums) {
                setAlbums(response.albums.items)
            }

            if (response.tracks) {
                setTracks(response.tracks.items)
            }
        }
    }

    const {goToAlbum} = useNavigation();

    return(
        <>
            {/* Search form */}
            <div className="m-1 border rounded-full w-full">
                <form onSubmit={handleSubmit} className="flex">
                    <input
                        onChange={handleChange}
                        name={'search'}
                        value={form.search}
                        placeholder="Podcast, audiobook.."
                    />
                    <select name={'type'} onChange={handleChange} value={form.type} className='rounded-lg'>
                        <option value="">Type</option> 
                        <option value={"audiobook"}>Audiobook</option>
                        <option value={"show"}>Podcast</option>
                        <option value={"artist"}>Artist</option>
                        <option value={"album"}>Album</option>
                        <option value={"track"}>Song</option>
                    </select>
                    <button type="submit"><MagnifyingGlassIcon className="size-5"/></button>
                </form>

            </div>
            <div className="h-screen overflow-auto pb-16 mx-4">
                {/* Podcasts */}
                <div>
                    {podcasts.length > 0 && (
                        <>
                            <p>Search results for : <span className="font-bold">{form.search}</span></p>
                            {podcasts.map((podcast) =>
                                <div key={podcast.id}>
                                    <img src={podcast.images[0].url} alt={podcast.name} className='rounded-lg w-20'/>
                                    <div className="flex">
                                        <p className="font-bold">{podcast.name}</p>
                                        <div>
                                            <p>{podcast.type === 'show' ? 'Podcast': ''}</p>
                                            <p>{podcast.publisher}</p>
                                        </div>
                                    </div>
                                </div> 
                            )}
                        </>
                    )}
                </div>

                {/* Audiobooks */}
                <div>
                    {audiobooks.length > 0 && (
                        <>
                            <p>Search results for : <span className="font-bold">{form.search}</span></p>
                            {audiobooks.length > 0 && audiobooks.map((audiobook) =>
                                <div key={audiobook.id}>
                                    <img src={audiobook.images[0].url} alt={audiobook.name} className="rounded-lg w-20" />
                                    <div className="flex">
                                        <p className="font-bold">{audiobook.name}</p>
                                        <div>
                                            <p>{audiobook.publisher}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Albums */}
                <div>
                    {albums.length > 0 && (
                        <>
                            <p>Search results for : <span className="font-bold">{form.search}</span></p>
                            {albums.length > 0 && albums.map((album) =>
                                <div key={album.id} onClick={() => goToAlbum(album.id)} className="hover:bg-gray-300 cursor-pointer">
                                    <img src={album.images[0].url} alt={album.name} className="rounded-lg w-20" />
                                    <div className="flex">
                                        <p className="font-bold">{album.name}</p>
                                        <div>
                                            <p>{album.artists[0].name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Tracks */}
                <div>
                    {tracks.length > 0 && (
                        <>
                            <p>Search results for : <span className="font-bold">{form.search}</span></p>
                            {tracks.length > 0 && tracks.map((track) =>
                                <div key={track.id}>
                                    {track.album?.images?.length > 0 ? (
                                        <img 
                                            src={track.album.images[0].url} 
                                            alt={track.name} 
                                            className="rounded-lg w-20" 
                                        />
                                    ) : (
                                        <p>No Image Available</p>
                                    )}
                                    <div className="flex">
                                        <p className="font-bold">{track.name}</p>
                                        <div>
                                            <p>{track.type === 'track' ? 'Song' : ''}</p>
                                            <p>{track.artists[0].name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Artists */}
                <div>
                    {artists.length > 0 && (
                        <>
                            <p>Search results for : <span className="font-bold">{form.search}</span></p>
                            {artists.length > 0 && artists.map((artist) =>
                                <div key={artist.id}>
                                    {artist.images?.length > 0 ? (
                                        <img 
                                            src={artist.images[0].url} 
                                            alt={artist.name} 
                                            className="rounded-full w-20" 
                                        />
                                    ) : (
                                        <p>No Image Available</p>
                                    )}
                                    <div className="flex">
                                        <p className="font-bold">{artist.name}</p>
                                        <p>{artist.type}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Navbar/>
        </>
    )
}

export default Search;