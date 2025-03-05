import { HomeIcon, MagnifyingGlassIcon, InformationCircleIcon, UserCircleIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-evenly fixed bottom-0 p-2 w-full bg-white'>
      <div className='p-1 flex flex-col items-center'>
        <Link to='/'>
          <HomeIcon className='size-6'/>
          <p className='text-xs'>Home</p>
        </Link>
      </div>
      <div className='p-1 flex flex-col items-center'>
        <MagnifyingGlassIcon className='size-6'/>
        <p className='text-xs'>Discover</p>
      </div>
      <div className='p-1 flex flex-col items-center'>
        <UserCircleIcon className='size-6'/>
        <p className='text-xs'>User</p>
      </div>
      <div className='p-1 flex flex-col items-center'>
        <InformationCircleIcon className='size-6'/>
        <p className='text-xs'>Infos</p>
      </div>
      <div className='p-1 flex flex-col items-center'>
        <AdjustmentsHorizontalIcon className='size-6'/>
        <p className='text-xs'>Settings</p>
      </div>
    </nav>
  )
}

export default Navbar;
