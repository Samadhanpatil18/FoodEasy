import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer";
import About from "./pages/About";
import Menu from "./pages/Menu";
import StoredContextProvider from './context/StoredContextProvider';
import Cart from './pages/Cart';
import Error404 from './pages/Error404';
import Order from './pages/Order';
import Verify from './pages/Verify';
import MyOrders from './pages/MyOrders';
import ForgetPassword from './pages/ForgetPassword';
import { Zoom , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './pages/ResetPassword';

function App() {

  return (
    <>
    <BrowserRouter>
      <StoredContextProvider>
        <div>
          <ToastContainer theme='light' position='top-center' autoClose={3000} transition={Zoom}/>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/menu" element={<Menu />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/cart/order" element={<Order />}/>
            <Route path="/cart/order/verify" element={<Verify />}/>
            <Route path="/myorders" element={<MyOrders />}/>
            <Route path="/forgot_password" element={<ForgetPassword />}/>
            <Route path="/forgot_password/reset" element={<ResetPassword />}/>
            <Route path='*' element={<Error404 />} />
          </Routes> 
          <Footer /> 
        </div>
      </StoredContextProvider>
    </BrowserRouter>
    </>
  )
}

export default App
