
// eslint-disable-next-line react/prop-types
function ErrorMessage({error}) {
    return (
        <div className="screen-max-width p-2 flex flex-col w-full h-[80vh] gap-5">
          <h1 className="text-xl font-bold text-center text-amber-900">Something went wrong, Cannot get the Menu Items</h1>
          <p className="text-center">Error : {error}</p>
        </div>
    )
}

export default ErrorMessage