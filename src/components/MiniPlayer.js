import { useContext } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";
import { DarkModeContext } from "../contexts/ThemeContext";

const MiniPlayer = ({handleOpen}) => {
    const {track, isPlaying, togglePlayPause} = usePlayer();
    const { darkMode } = useContext(DarkModeContext);

    if (!track) return null;

    

    return (
        <div className={`fixed bottom-16 left-0 w-full ${darkMode ? 'bg-[rgb(15,15,39)]' : 'bg-white'} p-3 flex items-center justify-between mini-player`}
            onClick={handleOpen}>
          <div className="flex items-center gap-2">
            <img src={track.image} alt={track.title} className="w-12 h-12 rounded" />
            <div>
              <h3 className="text-sm font-bold">{track.title}</h3>
              <p className="text-xs opacity-75">{track.artist}</p>
            </div>
          </div>
    
          <button onClick={togglePlayPause} className="text-lg">
            {isPlaying ? <PauseIcon className="size-6"/> : <PlayIcon className="size-6"/>}
          </button>
        </div>
      );
}

export default MiniPlayer;