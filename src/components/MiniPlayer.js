import { useState } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import Player from "./Player";

const MiniPlayer = ({handleOpen}) => {
    const {track, isPlaying, togglePlayPause} = usePlayer();

    if (!track) return null;

    

    return (
        <div className="fixed bottom-16 left-0 w-full bg-gray-900 text-white p-3 flex items-center justify-between"
            onClick={handleOpen}>
          <div className="flex items-center gap-2">
            <img src={track.image} alt={track.title} className="w-12 h-12 rounded" />
            <div>
              <h3 className="text-sm font-bold">{track.title}</h3>
              <p className="text-xs opacity-75">{track.artist}</p>
            </div>
          </div>
    
          <button onClick={togglePlayPause} className="text-lg">
            {isPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
      );
}

export default MiniPlayer;