import { useContext, useEffect, useState } from 'react'
import '../assets/styles/reset.css'
import axios from 'axios'
import { StoreContext } from '../context/StoredContextProvider'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {

  const { backendUrl, token } = useContext(StoreContext);
  const [email,setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [disableEmail,setDisableEmail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    async function checkUser(){

      const response = await axios.post(backendUrl + '/api/user/checklogin',{}, {headers : {token : localStorage.getItem('mm-token') ?? false}});

      if(response.data.success){
        navigate('/');
      }
    }
    checkUser()
  },[])

  async function sendOtp (event) {
    event.preventDefault();
    const response = await axios.post(backendUrl + '/api/user/reqotp', {email});

    if(response.data.success){
      setShowOtp(true);
      toast.success('OTP Sent Successfully', {theme : 'colored'});
      setDisableEmail(true);
      setTimeout(() => setDisableEmail(false), 50000);
    }
    else{
      toast.error(response.data.message, {theme : 'colored'});
    }
  }

  async function verifyOtp (event) {
    event.preventDefault();

    const response = await axios.post(backendUrl + '/api/user/verifyotp', {email,otp}, {headers : {token}});
    if(response.data.success){
      sessionStorage.setItem('auth_verified', response.data.auth_token);
      navigate('/forgot_password/reset');
    }
    else{
      toast.error(response.data.message, {theme : 'colored'});
      setOtp("");
    }
  }

  return (
    <div id="forgot-container" className="screen-max-width grid place-items-center">
      <div className="wrapper mb-5 w-full p-3 sm:p-5 text-amber-950 items-center">
        <form className="email-div w-full flex flex-col items-center" onSubmit={sendOtp}>
          <label htmlFor="email" className='mb-2 self-start' >Enter your email <i className="fa-solid fa-envelope"></i></label>
          <div className="email-inp relative flex w-full">
            <input type="email" id='email' readOnly={disableEmail} title="Enter a valid Email" name="email" placeholder='Email' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className="email-auth px-3 py-1 w-full text-sm sm:text-base" value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" disabled={disableEmail} className='text-white text-sm bg-orange-600 py-1 px-4 w-36 rounded-md mt-5'>
            SEND OTP
          </button>
        </form>
        {showOtp && email !== '' &&
        <form className="otp-div w-full" onSubmit={verifyOtp}>
          <input type="text" name="otp" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)}
            pattern="\d{4}" maxLength="4" placeholder="Enter OTP" title="Please enter a 4-digit OTP" required
          />
          <button type="submit">Verify</button>
        </form>
        }
      </div>
    </div>
  )
}
