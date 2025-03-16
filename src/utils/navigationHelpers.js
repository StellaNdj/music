import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();

    const goToArtist = (id) => {
        navigate(`artist/${id}`);
    }
    
    const goToAlbum = (id) => {
        navigate(`album/${id}`)
    }

    return { goToArtist, goToAlbum };

};
export default useNavigation;