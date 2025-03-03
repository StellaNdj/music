import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  return (
    <nav className='flex sticky bottom-0 p-2'>
      <div>
        <HomeIcon className='size-6'/>
        <p>Home</p>
      </div>
      <div>
        <MagnifyingGlassIcon className='size-6'/>
        <p>Discover</p>
      </div>
    </nav>
  )
}

export default Navbar;
