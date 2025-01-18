import { useContext, useEffect, useState } from 'react'
import '../assets/styles/reset.css'
import axios from 'axios';
import { StoreContext } from '../context/StoredContextProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

  const { backendUrl } = useContext(StoreContext);
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(null);

  const [data, setData] = useState({
    password : "",
    c_password : ""
  });

  // React frontend
  useEffect(() => {
    function checkAuth() {
      
      setAuthToken(sessionStorage.getItem('auth_verified'));
      if (!sessionStorage.getItem('auth_verified')) {
        alert('Session expired');
        navigate('/');
      }
      else{
        sessionStorage.removeItem('auth_verified');
      }
    }
    checkAuth()
  }, []);


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    setData((prev) => ({...prev, [name] : val}));
  }

  async function resetPassword (event) {
    event.preventDefault();

    const response = await axios.post(backendUrl + '/api/user/resetpsw', {newpassword : data.password, auth_token : authToken});
    if(response.data.success){
      toast.success(response.data.message, {autoClose : 2000, theme : 'colored'});
      setTimeout(() => navigate('/'), 2000);
    }
    else{
      toast.error(response.data.message,  {autoClose : 2000, theme : 'colored'});
    }
  }

  return (
    <div className="reset-psw-container screen-max-width px-2 sm:px-8 lg:px-14 xl:px-20 grid place-items-center">
      <form className="wrapper w-full mb-5 text-amber-950 flex flex-col px-2 py-5" onSubmit={resetPassword}>
        <label htmlFor="psw" className='mb-1'>Enter a new Password</label>
        <input type="password" id="psw" name='password' required placeholder='Enter Password' className='inp-check w-full px-3 py-1 rounded-sm mb-4'
        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$" title="Password must be at least 6 characters, including 1 character, 1 number, and 1 special character."
        onChange={onChangeHandler} value={data.password} />
        <label htmlFor="c-psw" className='mb-1'>Confirm Password</label>
        <input type="password" id='c-psw' name='c_password' required placeholder='Re enter password' className='inp-check w-full px-3 py-1 rounded-sm mb-2'
        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$" title="Password must be at least 6 characters, including 1 character, 1 number, and 1 special character."
        onChange={onChangeHandler} value={data.c_password} />
        {data.password !== data.c_password && <span className='text-sm text-red-500'>password doesn&apos;t match</span>}
        <button type='submit' disabled={data.password !== data.c_password || data.password === ""} className='py-1 text-white font-semibold my-3 rounded-sm bg-orange-500'>Change Password</button>
      </form>
    </div>
  )
}

export default ResetPassword