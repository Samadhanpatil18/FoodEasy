
import { useContext, useState, useRef, useEffect} from 'react'
 import app_logo from '../assets/images/foodeasy.png'




import '../assets/styles/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { navLinks } from '../constants/data'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { StoreContext } from '../context/StoredContextProvider'
import axios from 'axios'
import order_icon from '../assets/images/myorders.png'
import logout_icon from '../assets/images/logout.png'
import { motion } from 'framer-motion'

function Navbar() {

  const { activeLink, setActiveLink, loginTab, setLoginTab, backendUrl, token, setToken, getCartTotal } = useContext(StoreContext);

  const [pswNotMatch, setPswNotMatch] = useState(false);
  const [profileTab, setProfileTab] = useState(false);
  const navigate = useNavigate();

  const sampleFormData = {
    username : "",
    email : "",
    password : "",
    c_password : ""
  }
  const [formData, setFormData] = useState(sampleFormData)

  useEffect(() => {
    setPswNotMatch(formData.password !== formData.c_password)
  },[formData.password,formData.c_password])

  const onchageHandler = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    setFormData((prev) => ({...prev, [name] : val}));
  }

  const onSubmitForm = async (event, formType) => {
    event.preventDefault();
    
    let newUrl = backendUrl + "/api/user"

    if(formType == "login"){
      newUrl += "/login"
    }
    else{
      if(formData.password !== formData.c_password ){
        return setPswNotMatch(true);
      }
      newUrl += "/register"
    }

    const response = await axios.post(newUrl, formData);

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("mm_token", response.data.token);
      setLoginTab(false);
    }
    else{
      alert(response.data.message);
    }
  } 

  const onLogout = () => {
    localStorage.removeItem('mm_token');
    setToken("");
    setProfileTab(false);
    navigate('/');
  }

  const [openMenu, setOpenMenu] = useState(false);
  const formRef = useRef(null);

  function scrollToBottom(e) {
    e.preventDefault();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' // Smooth scrolling effect
    });
    setOpenMenu(false)
  }

  function scrollToLogin(e){
    e.preventDefault();
    formRef.current.style.transform = "translateX(0px)";
    setFormData(sampleFormData)
  }

  function scrollToRegister(e){
    e.preventDefault();
    formRef.current.style.transform = "translateX(-100vw)"
    setFormData(sampleFormData);
  }

  const ProfileBtn = () => {
    return (
      <div className="profile-div relative">
        <button type='button' id='profile-btn' title='profile' className='p-5 bg-amber-950 text-white rounded-full'
        onClick={() => setProfileTab(!profileTab)} >
          <i className="fa-solid fa-user"></i>
        </button>
        {profileTab && 
        <motion.div className="profile-dropdown" initial={{scale:0}} animate={{scale:1}} transition={{duration:.35}} >
          <ul className='options'>
            <button type="button" onClick={() => {
              setProfileTab(false)
              navigate('/myorders')
            }}>
              <img src={order_icon} alt="" width="30px" /> My Orders
            </button>
            <button type="button" onClick={onLogout}>
              <img src={logout_icon} alt="" width="30px" /> Logout
            </button>
          </ul>
        </motion.div>
        }
      </div>
    )
  }

  const ScrollNavbar = () => {
    return (
      <div id="scroll-menu" className={`w-full h-[100vh] fixed bg-red-700 top-0 left-0 pt-20 flex flex-col items-center ${openMenu ? 'visible' : 'hide'}`}>
        <button type='menu-cancel-btn' className='text-4xl absolute right-5 top-5 p-2 text-white' onClick={()=>setOpenMenu(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <ul id="scroll-menu-links" className='text-white font-semibold flex flex-col items-center gap-8'>
          {navLinks.map( (e,i) => (
              <li key={i}>
                {e.url != '#contact' ? 
                <Link 
                onClick={()=>{
                  setActiveLink(e.text.toLowerCase())
                  setOpenMenu(false)
                }} 
                to={e.url}
                className={`${activeLink === e.text.toLowerCase() ? 'active' : ''}`}
               >{e.text}
                 <i className={e.icon}></i>
               </Link> :
                <a href='#contact' onClick={scrollToBottom}
                  className={`${activeLink === e.text.toLowerCase() ? 'active' : ''}`}
                >
                  Contact
                </a>
                }
              </li>
          ))}
        </ul>
      </div>
    )
  }

  const navigateToCart = () => {
    if(token != ""){
      navigate('/cart');
    }
    else{
      setLoginTab(true);
    }
  }

  return (
    <div id="navbar-container" className="bg-white w-full h-16 py-1 px-2 md:px-8 xl:px-12 sm:px-2 fixed top-0 left-0">
      <header className=''>
        <ScrollNavbar />
        <nav className='flex space-x-4 justify-between items-center w-full'>
          <div id='nav-login-div' className='sm:hidden order-3 flex gap-2'>
            <button id='cart-btn' type='button' className='text-white flex items-center relative' onClick={navigateToCart}>
              {getCartTotal() > 0 && <span className='w-3 h-3 bg-orange-400 rounded-full absolute -top-1 -right-1'></span>}
              <i className="fa-solid fa-bag-shopping"></i>
            </button>
            {token == "" ?
              <button id='login-btn' className='text-white flex items-center'
                onClick={() => setLoginTab(true)}
              >
                <i className="fa-solid fa-right-to-bracket"></i>
              </button> :
              <ProfileBtn />
            }
          </div>
          <div id="nav-logo" className='order-2 sm:order-1'>
            <Link to="/">
              <img src={app_logo} alt="logo" className='w-20 sm:w-24 lg:w-28'/>
            </Link>
          </div>
          <ul id="nav-links" className='order-1 sm:order-2 space-x-3 text-amber-900 font-bold hidden sm:flex'>
            {navLinks.map( (e,i) => (
              <li key={i}>
                {e.url != "#contact" ?
                  <Link onClick={() => setActiveLink(e.text.toLowerCase())} to={e.url} className={`${activeLink === e.text.toLowerCase() ? 'active' : ''}`} >{e.text}</Link> :
                  <a href='#contact' onClick={scrollToBottom} className={`${activeLink === e.text.toLowerCase() ? 'active' : ''}`}>
                    Contact
                  </a>
                }
              </li>
            ))}
          </ul>
          <div id="other-links" className='order-3 hidden sm:flex space-x-4 text-amber-900 font-semibold'>
            <button id='cart-btn' type='button' title='Cart' className='relative' onClick={navigateToCart}>
              {getCartTotal() > 0 && <span className='w-3 h-3 bg-orange-400 rounded-full absolute -top-1 -right-1'></span>}
              <i className="fa-solid fa-bag-shopping"></i>
            </button>
            { token == "" ? 
              <button id='login-btn' className='text-white flex items-center gap-1'
                onClick={() => setLoginTab(true)}
              >
                Login <i className="fa-solid fa-right-to-bracket"></i>
              </button> :
              <ProfileBtn />
            }
          </div>
          <div id='burger-menu' className='sm:hidden'>
            <button type='button' className='text-xl sm:text-2xl' onClick={()=> setOpenMenu(true)}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </nav>
        {loginTab && 
        <div id="login-tab" className='grid place-items-center'>
          <button type='button' className='w-10 h-10 fixed top-5 rounded-full' onClick={() => setLoginTab(false)}>
            <i className="fa-solid fa-circle-xmark text-3xl text-white"></i>
          </button>
          <div className="form-scroll" ref={formRef}>
            <div className="form-wrapper">
              <LoginForm scrollToRegister={scrollToRegister} onChangeHandler={onchageHandler} onSubmitForm={onSubmitForm} formData={formData} />
            </div>
            <div className="form-wrapper">
              <RegisterForm scrollToLogin={scrollToLogin} onChangeHandler={onchageHandler} onSubmitForm={onSubmitForm} pswNotMatch={pswNotMatch} formData={formData}/>
            </div>
          </div>
        </div>
        }
        {profileTab && <motion.div className='profile-wrapper h-[100vw] w-[100vw] fixed top-0 left-0' 
          onClick={() => setProfileTab(false)} initial={{opacity:0}} animate={{opacity:1}} >
        </motion.div>}
      </header>
    </div>
  )
}

export default Navbar