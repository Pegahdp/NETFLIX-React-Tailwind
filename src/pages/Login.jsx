import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
   
    try {
      await logIn(email, password);
      navigate("/account");
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  console.log('user', user)
  return (
    <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute h-full w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5e48e7b6-350d-48d9-96d6-de8ca173c89f/0b1d11e5-54ba-42df-a395-3b4851bb1174/MY-en-20221219-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="fixed top-0 left-0 bg-black/60 w-full h-screen "></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[500px] bg-black/75 mx-auto text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-2xl font-bold">Sign In</h1>
              {error? <p className="bg-red-400 p-3 my-3">{error}</p> : null}
              <form className="w-full flex flex-col py-6" onSubmit={handleSubmit}>
                <input
                  className="p-3 my-2 rounded bg-gray-700"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="p-3 my-2 rounded bg-gray-700"
                  type="password"
                  placeholder="Password"
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-red-600 rounded my-6 py-3 font-bold">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input type="checkbox" /> Remember me
                  </p>
                  <p className="mr-2">Need help?</p>
                </div>
                <p className="py-6">
                  <span className="text-gray-600">
                    New to Netflix?
                  </span>
                  <Link to="/signup"> Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login