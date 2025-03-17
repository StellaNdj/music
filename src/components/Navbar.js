import { HomeIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { DarkModeContext } from '../contexts/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  return (
    <nav className={`flex justify-evenly fixed bottom-0 p-2 w-full z-[1000] ${darkMode ? 'bg-[rgb(15,15,39)]' : 'bg-white'}`}>
      <Link to='/'>
        <div className='p-1 flex flex-col items-center'>
          <HomeIcon className='size-6'/>
          <p className='text-xs'>Home</p>
        </div>
      </Link>
      <Link to='/search'>
        <div className='p-1 flex flex-col items-center'>
          <MagnifyingGlassIcon className='size-6'/>
          <p className='text-xs'>Search</p>
        </div>
      </Link>
      <div className='p-1 flex flex-col items-center'>
          <button onClick={toggleDarkMode}>
            {darkMode ? <SunIcon className='size-6'/> : <MoonIcon className='size-6'/>}
            {darkMode ? <p className='text-xs'>Light</p> : <p className='text-xs'>Dark</p>}
          </button>
      </div>
    </nav>
  )
}

export default Navbar;
