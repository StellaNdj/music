import { usePlayer } from "../contexts/PlayerContext";

const Player = ({handleClose}) => {
    console.log("Player mounted");

    const { track, isPlaying, togglePlayPause, currentTime, duration, seek, changeVolume } = usePlayer();

    return (
        <div className="fixed inset-0 bg-gray-800 text-white flex flex-col items-center justify-center z-[999] pb-10"
        onClick={(e) => e.stopPropagation()} 
        >
          
          <img src={track.image} alt={track.title} className="w-64 h-64 rounded-lg mb-4" />
          <h2 className="text-2xl font-bold">{track.title}</h2>
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
            <button onClick={() => seek(currentTime - 10)}>⏪ 10s</button>
            <button onClick={togglePlayPause}>{isPlaying ? "⏸️" : "▶️"}</button>
            <button onClick={() => seek(currentTime + 10)}>⏩ 10s</button>
          </div>
    
          <button 
            onClick={(e) => {
                e.stopPropagation(); // 👈 Stops click from bubbling to MiniPlayer
                handleClose();
            }} 
            className="right-4 text-2xl"
        >
            ✖️
        </button>
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