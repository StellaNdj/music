import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { DarkModeContext } from '../contexts/ThemeContext';


const StickyHeader = ({ title, titleRef }) => {
  const [scrolled, setScrolled] = useState(false);
  const [titleSticky, setTitleSticky] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 0);

      // Track when the title reaches the sticky position
      if (titleRef?.current) {
        const titleTop = titleRef.current.getBoundingClientRect().top;
        setTitleSticky(titleTop <= 60 && scrollTop > 0); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? `backdrop-blur-md border-b ${darkMode ? 'bg-[rgb(15,15,39)]/50 border-gray-600' : 'bg-white/50 border-gray-300' }` : "bg-transparent border-none"
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-3">
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className={`p-1 rounded-full ${scrolled ? '' : "bg-gray-200"}  hover:bg-gray-300 transition`}>
            <ChevronLeftIcon className='size-4'/>
          </button>

          {/* Sticky Title (only visible when scrolled past the title) */}
          <h2 className={`text-lg font-bold transition-opacity ${titleSticky ? "opacity-100" : "opacity-0"}`}>
            {title}
          </h2>
        </div>
      </div>
    </>
  );
};

export default StickyHeader;
