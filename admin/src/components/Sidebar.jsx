import { useContext } from "react"
import { Link } from "react-router-dom"
import { StoreContext } from "../context/StoredContext"

function Sidebar() {
  
  const { activeLink } = useContext(StoreContext);


  return (
    <div className="w-full p-1 sm:py-3 px-2 lg:px-6 sm:w-52 lg:w-72 sm:h-[95vh] fixed left-0 top-[72px] sm:top-[80px] bg-white">
      <nav className="w-full">
        <ul className="w-full flex gap-3 justify-evenly sm:flex-col sm:items-end font-semibold sm:gap-5">
          <Link to='/addfood' className={`nav-items ${activeLink == 'add' ? 'active' : ''}`}>Add Item</Link>
          <Link to='/' className={`nav-items ${activeLink == 'list' ? 'active' : ''}`}>List Items</Link>
          <Link to='/orders' className={`nav-items ${activeLink == 'order' ? 'active' : ''}`}>Orders</Link>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar