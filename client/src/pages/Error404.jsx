import { Link } from 'react-router-dom'

function Error404() {
  return (
    <div id='error-container' className="screen-max-width grid place-items-center">
      <div className='text-center'>
        <h1 className='text-2xl mb-2'>Error - 404 : Page Not Found</h1>
        <Link to='/' className='text-orange-500 underline'>Go to Home Page</Link>
      </div>
    </div>
  )
}

export default Error404