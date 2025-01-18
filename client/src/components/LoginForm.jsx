/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const LoginForm = ({scrollToRegister, onChangeHandler, onSubmitForm, formData, setLoginTab}) => {

  return (
    <form id='login-form' onSubmit={(e) => (onSubmitForm(e,"login"))}>
      <h1 className='text-2xl mb-5 font-bold text-orange-600'>Login</h1>
      <input type="email" name='email' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address." placeholder='Enter email' className='inp-check w-full px-3 py-1 rounded-md mb-4'
        onChange={onChangeHandler} value={formData.email}
      />
      <input type="password" name='password' minLength="6" required placeholder='Enter Password' className='inp-check w-full px-3 py-1 rounded-md mb-4'
        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$" title="Password must be at least 6 characters, including 1 character, 1 number, and 1 special character."
        onChange={onChangeHandler} value={formData.password}
      />  
      <div className="terms flex items-start gap-2 mb-4">
        <input type="checkbox" className='m-1' name="terms" required />
        <p className='text-xs sm:text-sm'>By Continuing, i agree to the terms of use & Privacy policy.</p>
      </div>
      <Link to='/forgot_password' className="text-sm text-violet-500 underline" onClick={(() => setLoginTab(false))}>forgot password?</Link>
      <button type="submit" className='py-1 text-white w-full bg-orange-500 rounded-lg mt-3'>
        Login
      </button>
      <div className="navigate mt-3 text-xs sm:text-sm">
        <p>Haven&apos;t account? Create Account - 
          <a href="#" onClick={scrollToRegister} className='text-orange-600'>Sign up</a>
        </p>
      </div>
    </form>
  )
}

export default LoginForm;