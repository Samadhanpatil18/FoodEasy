/* eslint-disable react/prop-types */


const RegisterForm = ({scrollToLogin, onChangeHandler, onSubmitForm, pswNotMatch, formData}) => {

  return (
    <form id='register-form' onSubmit={(e) => onSubmitForm(e,"register")}>
      <h1 className='text-2xl mb-5 font-bold text-orange-600'>Sign up</h1>
      <input type="text" name='username' required pattern="^[a-zA-Z0-9]{3,16}$" title="Username must be 3-16 characters long and contain only letters and numbers." placeholder='Enter Username' className='inp-check w-full px-3 py-1 rounded-md mb-4'
        onChange={onChangeHandler} value={formData.username}
      />
      <input type="email" name='email' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address." placeholder='Enter email' className='inp-check w-full px-3 py-1 rounded-md mb-4'
        onChange={onChangeHandler} value={formData.email}
      />
      <input type="password" name='password' required placeholder='Enter Password' className='inp-check w-full px-3 py-1 rounded-md mb-4'
        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$" title="Password must be at least 6 characters, including 1 character, 1 number, and 1 special character."
        onChange={onChangeHandler} value={formData.password}
      />
      <input type="password" name='c_password' required placeholder='Confirm Password' className='inp-check w-full px-3 py-1 rounded-md mb-1'
        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$" title="Password must be at least 6 characters, including 1 character, 1 number, and 1 special character."
        onChange={onChangeHandler} value={formData.c_password}
      />
      {pswNotMatch && <span className="text-red-400 text-xs self-start">Password Doesn&lsquo;t Match</span>}
      <div className="terms flex items-start gap-2 my-3">
        <input type="checkbox" className='m-1' name="terms" required />
        <p className='text-xs sm:text-sm'>By Continuing, i agree to the terms of use & Privacy policy.</p>
      </div>
      <button type="submit" className='py-1 text-white w-full bg-orange-500 rounded-lg'>Sign up</button>
      <div className="navigate mt-3 text-xs sm:text-sm">
        <p> Already have an Account? - 
          <a href="#" onClick={scrollToLogin} className='text-orange-600'>Login</a>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm;