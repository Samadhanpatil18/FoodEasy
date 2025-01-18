import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoredContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Credential() {

  const { setToken, backendUrl, checkAuth, setActiveLink } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    id : "",
    password : ""
  });

  useEffect(() => {
    if(checkAuth()){
      navigate('/menu');
    }
    else{
      setActiveLink("");
    }
  },[]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({...prev, [name] : value}));
  }

  const adminLogin = async (event) => {
    event.preventDefault();

    const response = await axios.post(backendUrl + '/api/admin/login', data);
    if(response.data.success){
      localStorage.setItem('mm-admin', response.data.token);
      setToken(response.data.token);
      navigate('/menu');
    }
    else{
      alert(response.data.message);
    }
  }

  return (
    <div className="w-full px-2 grid place-items-center">
      <form onSubmit={adminLogin}>
        <h1 className="text-center font-bold text-xl mb-5">Admin Login</h1>
        <input type="text" required placeholder="Enter Admin Id" name="id" className="block px-3 py-1 rounded-md bg-black text-white mb-3" value={data.id} onChange={onChangeHandler} />
        <input type="password" required name="password" placeholder="Enter Admin Password" className="block px-3 py-1 rounded-md bg-black text-white mb-3" value={data.password} onChange={onChangeHandler} />
        <button type="submit" className="py-1 px-5 bg-blue-800 text-white font-semibold rounded-sm">Login</button>
      </form>
    </div>
  )
}

export default Credential