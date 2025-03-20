import { useContext } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { XMarkIcon, PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/outline";
import { DarkModeContext } from "../contexts/ThemeContext";

const Player = ({handleClose}) => {
  
    const { track, isPlaying, togglePlayPause, currentTime, duration, seek, changeVolume } = usePlayer();
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`fixed inset-0 ${darkMode ? 'bg-[rgb(15,15,39)]' : 'bg-white border-2'} flex flex-col items-center justify-center z-[999] pb-10`}
        onClick={(e) => e.stopPropagation()} 
        >
            <button 
            onClick={(e) => {
                e.stopPropagation(); 
                handleClose();
            }} 
            className="absolute top-4 right-4 text-2xl"
          >
            <XMarkIcon className='size-6'/>
          </button>
          
          <img src={track.image} alt={track.title} className="w-40 h-40 rounded-lg mb-4" />
          <h2 className="text-2xl text-center font-bold p-2">{track.title}</h2>
          <p className="text-sm opacity-75">{track.artist}</p>
    
          {/* Seek Bar */}
          <input 
            type="range" 
            min="0" 
            max={duration || 1} 
            value={currentTime} 
            onChange={(e) => seek(e.target.value)} 
            className="w-64 mt-4"
          />
    
          <div className="flex gap-4 mt-4">
            <button onClick={() => seek(currentTime - 10)}><BackwardIcon className="size-6"/> 10s</button>
            <button onClick={togglePlayPause}>{isPlaying ? <PauseIcon className="size-6"/> : <PlayIcon className="size-6"/>}</button>
            <button onClick={() => seek(currentTime + 10)}><ForwardIcon className="size-6"/> 10s</button>
          </div>
    
          
          {/* Volume */}
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={track.volume} 
            onChange={(e) => changeVolume(e.target.value)} 
            className="w-32 mt-4"
          />

        </div>
      );

}

export default Player;