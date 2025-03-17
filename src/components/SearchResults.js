const SearchResults = ({ loading, searchTerm, podcasts, audiobooks, artists, albums, tracks, goToAlbum, goToArtist, goToPodcast, goToAudiobook }) => {
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
            <p className="text-lg font-bold">Search results for: {searchTerm}</p>

            {/* Podcasts */}
            {podcasts.length > 0 && (
                <div>
                    <h3 className="font-bold">Podcasts</h3>
                    {podcasts.map(podcast => (
                        <div key={podcast.id} className="flex items-center cursor-pointer" onClick={() => goToPodcast(podcast.id)}>
                            <img src={podcast.images[0]?.url} alt={podcast.name} className="rounded-lg w-20" />
                            <div className="ml-2">
                                <p className="font-bold">{podcast.name}</p>
                                <p>{podcast.publisher}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Audiobooks */}
            {audiobooks.length > 0 && (
                <div>
                    <h3 className="font-bold">Audiobooks</h3>
                    {audiobooks.map(audiobook => (
                        <div key={audiobook.id} className="flex items-center cursor-pointer" onClick={() => goToAudiobook(audiobook.id)}>
                            <img src={audiobook.images[0]?.url} alt={audiobook.name} className="rounded-lg w-20" />
                            <p className="ml-2 font-bold">{audiobook.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Albums */}
            {albums.length > 0 && (
                <div>
                    <h3 className="font-bold">Albums</h3>
                    {albums.map(album => (
                        <div key={album.id} onClick={() => goToAlbum(album.id)} className="cursor-pointer hover:bg-gray-300 flex items-center">
                            <img src={album.images[0]?.url} alt={album.name} className="rounded-lg w-20" />
                            <p className="ml-2 font-bold">{album.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Tracks */}
            {tracks.length > 0 && (
                <div>
                    <h3 className="font-bold">Songs</h3>
                    {tracks.map(track => (
                        <div key={track.id} className="flex items-center">
                            {track.album?.images?.length > 0 ? (
                                <img src={track.album.images[0]?.url} alt={track.name} className="rounded-lg w-20" />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            <div className="ml-2">
                                <p className="font-bold">{track.name}</p>
                                <p>{track.artists[0]?.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Artists */}
            {artists.length > 0 && (
                <div>
                    <h3 className="font-bold">Artists</h3>
                    {artists.map(artist => (
                        <div key={artist.id} className="flex items-center cursor-pointer" onClick={() => goToArtist(artist.id)}>
                            {artist.images?.length > 0 ? (
                                <img src={artist.images[0]?.url} alt={artist.name} className="rounded-full w-20" />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            <p className="ml-2 font-bold">{artist.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
