import { createContext, useContext, useRef, useState } from "react";


const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);

    const audioRef = useRef(new Audio());

    // Play a track 
    const playTrack = (newTrack) => {
        if(track?.preview_url !== newTrack.preview_url) {
            audioRef.current.src = newTrack.preview_url;
            setTrack(newTrack);
            setIsPlaying(true);
            audioRef.current.play();
        } else {
            togglePlayPause();
        }
    }

    // Play Pause toggle
    const togglePlayPause = () => {
        if (!track) return
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    // Handle progress
    const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    }

    // Seek 
    const seek = (time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }

    // Adjust volume
    const changeVolume = (vol) => {
        audioRef.current.volume = vol;
        setVolume(vol);
    }

    // Attach time update listener
    audioRef.current.ontimeupdate = updateTime;

    return (
        <PlayerContext.Provider value={{
            track, isPlaying, currentTime, duration, volume, 
            playTrack, togglePlayPause, seek, changeVolume
        }}>
            {children}
        </PlayerContext.Provider>
    )
}
// Hook to use PlayerContext
export const usePlayer = () => useContext(PlayerContext);