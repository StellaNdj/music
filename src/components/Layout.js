import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import MiniPlayer from "./MiniPlayer";
import { useState } from "react";
import Player from "./Player";

const Layout = () => {
    const [showFullPlayer, setShowFullPlayer] = useState(false);
    return (
        <div>
            <Outlet/>
            <MiniPlayer handleOpen={() => setShowFullPlayer(true)}/>
            <Navbar/>
            {/* Player appears when showFullPlayer is true */}
            {showFullPlayer && (
                <div className="fixed inset-0 z-[999]">
                <Player handleClose={() => setShowFullPlayer(false)} />
                </div>
            )}
        </div>
    )
}

export default Layout;