import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { getAAATP } from "../Api";
import { AuthContext } from "../contexts/AuthContext";

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
        console.log(search, form.type);

        const response = await getAAATP({token: token, search: search, type: form.type})

        if (response) {
            if (response.shows) {
                console.log(response.shows)
                setPodcasts(response.shows.items)
            }

            if (response.audiobooks) {
                console.log(response.audiobooks)
                setAudiobooks(response.audiobooks.items)
            }

            if (response.artists) {
                console.log(response.artists)
                setArtists(response.artists.items)
            }

            if (response.albums) {
                console.log(response.albums)
                setAlbums(response.albums.items)
            }

            if (response.tracks) {
                console.log(response.tracks)
                setTracks(response.tracks.items)
            }
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    name={'search'}
                    className="border"
                    value={form.search}
                />
                <select name={'type'} onChange={handleChange} value={form.type}>
                    <option value="">Select a type</option> 
                    <option value={"audiobook"}>Audiobook</option>
                    <option value={"show"}>Podcast</option>
                    <option value={"artist"}>Artist</option>
                    <option value={"album"}>Album</option>
                    <option value={"track"}>Song</option>
                </select>
                <button type="submit">Search</button>
            </form>
            <h2>Search page</h2>
            {/* Podacasts */}
            <div>
                <p>Search results for : {form.search} </p>
                {podcasts && podcasts.map((podcast) =>
                    <div key={podcast.id}>
                        <img src={podcast.images[0].url} alt={podcast.name}/>
                        <p>{podcast.name}</p>
                        <p>{podcast.publisher}</p>
                    </div> 
                )}
            </div>

            {/* Audibooks */}

            {/* Albums */}

            {/* Tracks */}

            {/* Artists */}

            <Navbar/>
        </>
    )
}

export default Search;