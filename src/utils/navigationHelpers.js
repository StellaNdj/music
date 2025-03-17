import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();
    
    return {
        goToAlbum: (id) => navigate(`/album/${id}`), 
        goToArtist: (id) => navigate(`/artist/${id}`),
        goToPodcast: (id) => navigate(`/podcast/${id}`),
        goToAudiobook: (id) => navigate(`/audiobook/${id}`)
    };

};
export default useNavigation;