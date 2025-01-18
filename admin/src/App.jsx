import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import './App.css'
import Sidebar from "./components/Sidebar"
import ListItems from "./components/ListItems"
import StoredContext from "./context/StoredContext"
import AddItem from "./components/AddItem"
import { ToastContainer,Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Orders from "./components/Orders"
import Credential from "./components/Credential"

function App() {

  return (
    <>
    <BrowserRouter>
      <StoredContext>
        <div>
          <ToastContainer theme='dark' position='top-center' autoClose={3000} transition={Zoom} />
          <Navbar />
          <Routes>
            <Route path="/" element={<Credential />} />
            <Route path="/menu" element={<ListItems />} />
            <Route path="/addfood" element={<AddItem />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <Sidebar />
        </div>
      </StoredContext>
    </BrowserRouter>
    </>
  )
}

export default App
