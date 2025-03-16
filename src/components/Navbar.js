import { HomeIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { DarkModeContext } from '../contexts/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  return (
    <nav className='flex justify-evenly fixed bottom-0 p-2 w-full bg-transparent z-[1000]'>
      <div className='p-1 flex flex-col items-center'>
        <Link to='/'>
          <HomeIcon className='size-6'/>
          <p className='text-xs'>Home</p>
        </Link>
      </div>
      <div className='p-1 flex flex-col items-center'>
        <Link to='/search'>
          <MagnifyingGlassIcon className='size-6'/>
          <p className='text-xs'>Search</p>
        </Link>
      </div>
      <div className='p-1 flex flex-col items-center'>
          <button onClick={toggleDarkMode}>
            {darkMode ? <SunIcon className='size-6'/> : <MoonIcon className='size-6'/>}
          </button>
      </div>
    </nav>
  )
}

export default Navbar;
