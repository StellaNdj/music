import { useState, useEffect } from "react";

const StickyHeader = ({ title, image }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full p-4 z-50 transition-all backdrop-blur-md ${
        scrolled ? "bg-white/30 shadow-md" : "bg-transparent"
      }`}
    >
      {scrolled && (
        <div className="flex items-center gap-2">
          {image && <img src={image} alt={title} className="h-10 w-10 rounded-full" />}
          <h2 className="font-bold">{title}</h2>
        </div>
      )}
    </div>
  );
};

export default StickyHeader;
