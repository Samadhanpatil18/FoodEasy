import foodeasy from '../assets/images/foodeasy.png'
import profile_img from '../assets/images/customer-care.png'
import { useContext } from 'react'
import { StoreContext } from '../context/StoredContext'

function Navbar() {

  const { onLogout, token } = useContext(StoreContext);

  return (
    <header className="w-full screen-container py-2 flex justify-between items-center sm:h-20 fixed top-0 left-0">
      <section className="app-logo flex flex-col items-center">
        <img src={foodeasy} alt="" className='w-20 sm:w-32' />
        <h1 className='text-sm text-white font-bold sm:hidden'>Admin Panel</h1>
      </section>
      <h1 className='text-lg text-white font-bold hidden sm:block'>Admin Panel</h1>
      <section className='profile flex items-center gap-1'>
        <button type="button">
          <img src={profile_img} alt="" className='w-12 sm:w-14' />
        </button>
        {token != "" && <button type="button" onClick={onLogout} className='text-white bg-black font-bold py-1 px-3 text-xs'>Logout</button>}
      </section>
    </header>
  )
}

export default Navbar