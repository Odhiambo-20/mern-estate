import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAth from "../components/OAth";


const Signin = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log('Response:', data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
     dispatch(signInFailure(error.message));
    }
  };

  console.log(formData);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-lg w-full bg-white shadow-md rounded-lg">
        <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
  
          <input 
            type="email" 
            placeholder="email" 
            className="border p-3 rounded-lg" 
            id="email" 
            onChange={handleChange} 
          />
          <input 
            type="password" 
            placeholder="password" 
            className="border p-3 rounded-lg" 
            id="password" 
            onChange={handleChange} 
          />
          <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? 'Loading...' : 'Sign in'}
          </button>
          <OAth/>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <Link to="/sign-up ">
            <span className="text-blue-700">Sign up </span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default Signin;
