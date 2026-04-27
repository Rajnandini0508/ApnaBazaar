import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { clearSellerData } from "../redux/sellerSlice";

import authImage from "../assets/signup.png"; 

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(clearSellerData());
      dispatch(setUserData(result.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        { 
          email: result.user.email,
          fullName: result.user.displayName,
          role: "user" 
        },
        { withCredentials: true }
      );

      dispatch(clearSellerData());
      dispatch(setUserData(data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || err?.message || "Google Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

       <div className="hidden md:relative md:flex bg-[#ff4d2d] h-140 overflow-hidden">
  <img
    src={authImage}
    alt="ApnaBazaar"
    className="w-full h-full object-cover"
  />
</div>


        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-1 text-[#ff4d2d]">
            Apna<span className='text-[#16232A]'>Bazaar.</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Hi! Welcome back, you’ve been missed
          </p>

          <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <div
            className="text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full py-2 rounded-lg bg-[#ff4d2d] text-white font-medium"
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Sign In"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              * {error}
            </p>
          )}

          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-400">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button
            onClick={handleGoogleAuth}
            className="w-full py-2 border rounded-lg flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Sign In with Google
          </button>

          <p
            className="text-center mt-4 text-sm cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Don’t have an account?{" "}
            <span className="text-[#ff4d2d] font-medium">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
