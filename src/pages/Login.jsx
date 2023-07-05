import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loginError, setLoginError] = useState(null)
  const { user, signIn } = useAuth();
  const navigate = useNavigate();


  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      await signIn(email, password);
      // write the navigation to sign in page 
      navigate('/')

    } catch (error) {
      // Handle sign-up 
      switch (error.code) {
        case 'auth/invalid-email':
          setLoginError('Incorrect email. Please check your email and try again.')
          break
        case 'auth/wrong-password':
          setLoginError('Incorrect password. Please try again.')
          break
        default:
          setLoginError('An error occurred. Please try again.')
      }
    }
  }

  return (
    <>
    <div className=" w-full h-full">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d282a426-b01a-424c-9b83-2c2445e4b61a/cf0e5cd7-7d02-4f41-8a10-f5a5ffa8b57d/GB-en-20230626-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="Netflix"
        className=" hidden sm:block w-full h-full object-cover absolute "
      />
      <div className="fixed top-0 left-0 bg-black/70 w-full h-screen"></div>
      <div className="fixed w-full top-0 left-0 py-24 px-4">
        <div className="mx-auto max-w-[450px] h-[600px] bg-black/75 text-white">
          <div className=" mx-auto max-w-[320px] py-16">
            <h1 className=" text-3xl font-bold">Sign In</h1>
            {loginError && (
              <span className='bg-red-600 p-2 rounded block text-white mt-3'>
                {loginError}
              </span>
            )}            <form className="py-5 flex flex-col w-full">
              <input
                onChange={e=>{
                  setEmail(e.target.value)
                }}
                className=" my-2 py-4 bg-gray-600 px-2 rounded"
                type="Email"
                placeholder="Email"
              ></input>
              <input
              onChange={e=>
              {
                setPassword(e.target.value)
              }}
                className=" my-2 py-4 bg-gray-600 px-2 rounded"
                type="Password"
                placeholder="Password"
              ></input>
              <button onClick={handleSignIn} className=" bg-red-700 py-4 my-2 rounded font-bold">
                {" "}
                Sign In{" "}
              </button>
              <div className=" flex justify-between text-sm text-gray-600">
                  <p>
                    <input type="checkbox" className="mr-2"/>
                    Remember me
                  </p>
                  <p>Need Help?</p>
              </div>
              <div className="py-8">
                  <p className=" text-gray-600 text-sm">New to Netflix?
                  <Link to="/SignUp">
                   <span className="text-white"> Sign Up</span>
                  </Link>
                   </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login