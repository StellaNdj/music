import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { getAAATP } from "../Api";
import { AuthContext } from "../contexts/AuthContext";
import useNavigation from "../utils/navigationHelpers";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SearchResults from "../components/SearchResults";

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
    const [loading, setLoading] = useState(false);

    const { token } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
        setLoading(false);
    }

    const handleClear = () => {
        // Reset everything
        setForm({ search: '', type: '' });  
        setPodcasts([]);
        setAudiobooks([]);
        setArtists([]);
        setAlbums([]);
        setTracks([]);
        setLoading(false);
    }

    const {goToAlbum, goToArtist, goToPodcast, goToAudiobook} = useNavigation();

    return(
        <>
            <div className="mx-2 h-screen overflow-auto pb-16">
                <h2 className="font-bold text-2xl ">Search</h2>

                {/* Search form */}
                <div className="m-2 w-full max-w-lg mx-auto border rounded-full w-full p-2 flex items-center bg-gray-200">
                    <form onSubmit={handleSubmit} className='flex w-full'> 
                        <input
                            onChange={handleChange}
                            name="search"
                            value={form.search}
                            placeholder="Podcast, audiobook..."
                            className="bg-transparent flex-grow p-2 focus:outline-none"
                        />
                        <select
                            name="type"
                            onChange={handleChange}
                            value={form.type}
                            className="rounded-lg text-center bg-gray-500 px-2 py-1 mx-2"
                        >
                            <option value="">Type</option> 
                            <option value="audiobook">Audiobook</option>
                            <option value="show">Podcast</option>
                            <option value="artist">Artist</option>
                            <option value="album">Album</option>
                            <option value="track">Song</option>
                        </select>

                        {form.search && (
                            <button onClick={handleClear} className="p-2 text-gray-500">
                            ✕
                            </button>
                        )}
                        <button type="submit" className="p-2 bg-blue-500 rounded-full text-white" disabled={!form.search.trim() || !form.type}>
                            <MagnifyingGlassIcon className="size-5"/>
                        </button>
                    </form>
                </div>

                <SearchResults loading={loading} searchTerm={form.search} {...{ podcasts, audiobooks, artists, albums, tracks, goToAlbum, goToArtist, goToPodcast, goToAudiobook }} />

                <Navbar/>
            </div>
        </>
    )
}

export default Search;