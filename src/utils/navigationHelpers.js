import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();
    
    return {
        goToAlbum: (id) => navigate(`/album/${id}`), 
        goToArtist: (id) => navigate(`/artist/${id}`),
        goToPodcast: (id) => navigate(`/podcast/${id}`),
        goToAudiobook: (id) => navigate(`/audiobook/${id}`),
        goToPodcastEpisode: (id) => navigate(`/podcast/episode/${id}`),
        goToAudiobookChapter: (id) => navigate(`/audiobook/chapter/${id}`)
    };

};
export default useNavigation;