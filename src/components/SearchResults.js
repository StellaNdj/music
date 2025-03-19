const SearchResults = ({ loading, searchTerm, podcasts, audiobooks, artists, albums, tracks, goToAlbum, goToArtist, goToPodcast, goToAudiobook }) => {

    const limitChar = (string, max_length) => {
        return string.length > max_length ? string.slice(0, max_length) + '..' : string;
    }

    if (loading) {
        return <p className="text-center text-lg font-bold">Loading...</p>;
    }

    if (!searchTerm) {
        return (
            <div className="flex flex-wrap">
                <div className='bg-green-600 rounded-lg p-4 h-40 w-[15rem] m-2 relative'>
                    <p className='font-bold text-xl'>Audiobooks</p>
                    <img src='books.png' alt='Audiobooks' className="w-28 absolute bottom-0 right-0 p-1" />
                </div>
                <div className='bg-purple-600 rounded-lg p-4 h-40 w-[15rem] m-2 relative'>
                    <p className='font-bold text-xl'>Podcasts</p>
                    <img src='podcast.png' alt='Podcasts' className="w-28 absolute bottom-0 right-0 p-1" />
                </div>
                <div className='bg-orange-600 rounded-lg p-4 h-40 w-[15rem] m-2 relative'>
                    <p className='font-bold text-xl'>Artists</p>
                    <img src='oor.webp' alt='Artists' className="w-28 absolute bottom-0 right-0 p-1 rounded-lg" />
                </div>
                <div className='bg-pink-600 rounded-lg p-4 h-40 w-[15rem] m-2 relative'>
                    <p className='font-bold text-xl'>Albums</p>
                    <img src='dynamite.jpg' alt='Albums' className="w-28 absolute bottom-0 right-0 p-1 rounded-lg" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <p className="text-lg">Search results for: <span className='font-bold'>{searchTerm}</span> </p>

            {/* Podcasts */}
            {podcasts.length > 0 && (
                <div className='m-2'>
                    <h3 className="font-bold text-lg">Podcasts</h3>
                    {podcasts.map(podcast => (
                        <div key={podcast.id} className="flex items-center hover:bg-gray-500 cursor-pointer p-4 rounded-lg" onClick={() => goToPodcast(podcast.id)}>
                            <img src={podcast.images[0]?.url} alt={podcast.name} className="rounded-lg w-20" />
                            <div className="ml-2">
                                <p className="font-bold">{limitChar(podcast.name, 30)}</p>
                                <p>{podcast.publisher}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Audiobooks */}
            {audiobooks.length > 0 && (
                <div className='m-2'>
                    <h3 className="font-bold text-lg">Audiobooks</h3>
                    {audiobooks.map(audiobook => (
                        <div key={audiobook.id} className="flex items-center hover:bg-gray-500 cursor-pointer  p-4 rounded-lg" onClick={() => goToAudiobook(audiobook.id)}>
                            <img src={audiobook.images[0]?.url} alt={audiobook.name} className="rounded-lg w-20" />
                            <p className="ml-2 font-bold">{limitChar(audiobook.name, 30)}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Albums */}
            {albums.length > 0 && (
                <div className='m-2'>
                    <h3 className="font-bold text-lg">Albums</h3>
                    {albums.map(album => (
                        <div key={album.id} onClick={() => goToAlbum(album.id)} className="cursor-pointer hover:bg-gray-300 flex items-center  p-4 rounded-lg">
                            <img src={album.images[0]?.url} alt={album.name} className="rounded-lg w-20" />
                            <p className="ml-2 font-bold">{limitChar(album.name, 30)}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Tracks */}
            {tracks.length > 0 && (
                <div className='m-2'>
                    <h3 className="font-bold text-lg">Songs</h3>
                    {tracks.map(track => (
                        <div key={track.id} className="flex items-center hover:bg-gray-500 cursor-pointer  p-4 rounded-lg">
                            {track.album?.images?.length > 0 ? (
                                <img src={track.album.images[0]?.url} alt={track.name} className="rounded-lg w-20" />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            <div className="ml-2">
                                <p className="font-bold">{limitChar(track.name, 30)}</p>
                                <p>{track.artists[0]?.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Artists */}
            {artists.length > 0 && (
                <div className='m-2'>
                    <h3 className="font-bold text-lg">Artists</h3>
                    {artists.map(artist => (
                        <div key={artist.id} className="flex items-center hover:bg-gray-500 cursor-pointer  p-4 rounded-lg" onClick={() => goToArtist(artist.id)}>
                            {artist.images?.length > 0 ? (
                                <img src={artist.images[0]?.url} alt={artist.name} className="rounded-full w-20" />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            <p className="ml-2 font-bold">{limitChar(artist.name, 30)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
