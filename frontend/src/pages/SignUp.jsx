// import React from "react"
// import { useState } from 'react'
// import { FaRegEye } from "react-icons/fa";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"
// import { serverUrl } from "../App";
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from "../../firebase";
// import { ClipLoader } from "react-spinners";
// import { useDispatch } from 'react-redux'
// import { setUserData } from '../redux/userSlice'

// function  SignUp() {
//     const primaryColor = "#ff4d2d";
//     const hoverColor = "#e64323";
//     const bgColor = "#fff9f6";
//     const borderColor = "#ddd";

//     const [showPassword,setShowPassword]=useState(false)
//     const [role,setRole]=useState("user")
//     const navigate=useNavigate()
//     const [fullName,setFullName]=useState("")
//     const [email,setEmail]=useState("")
//     const [password,setPassword]=useState("")
//     const [mobile,setMobile]=useState("")
//     const [error,setError]=useState("")
//     const [loading,setLoading]=useState(false)
//     const dispatch=useDispatch()

//     const handleSignUp=async () => {
//         setLoading(true)
//         try {
//             const result=await axios.post(`${serverUrl}/api/auth/signup`,{
//                 fullName,email,password,mobile,role
//             },{withCredentials:true})
//             dispatch(setUserData(result.data))
//             navigate("/")
//             setError("")
//             setLoading(false)
//         } catch (error) {
//             setError(error?.response?.data?.message)
//             setLoading(false)
//         }
//     }

//     const handleGoogleAuth=async ()=> {
//          if(!mobile){
//             return setError("Mobile Number is required!")
//         }
//         const provider=new GoogleAuthProvider()
//         const result=await signInWithPopup(auth,provider)
//         try{    
//             const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
//                 fullName:result.user.displayName,
//                 email:result.user.email,
//                 role,
//                 mobile
//             },{withCredentials:true})
//             dispatch(setUserData(data))
//         } catch (error) {
//             console.log(error)
//         }
//     }

//    return (
//     <div className='min-h-screen w-full flex items-center justify-center p-4' style={{backgroundColor: bgColor}}>
//        <div className={'bg-white rounded-xl shadow-lg w-full max-w-md p-8 border'} style={{ 
//             border: `1px solid ${borderColor}` }}>
//             <h1 className={'text-3xl font-bold mb-2'} style={{ color: primaryColor }}>
//                 ApnaBazaar </h1>

//             <p className="text-gray-600 mb-8">Create your account to get all the features</p>

//             {/* Full Name */}
//             <div className='mb-4'>
//                 <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'> Full Name</label>
//                 <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
//                     placeholder='Enter your full name' style={{ border:`1px solid ${borderColor}`}} onChange={(e)=>setFullName(e.target.value)}
//                     value={fullName} required/>
//             </div>
//             {/* Email */}
//             <div className='mb-4'>
//                 <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
//                 <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
//                     placeholder='Enter your Email' style={{ border:`1px solid ${borderColor}`}} onChange={(e)=>setEmail(e.target.value)}
//                     value={email} required/>
//             </div>
//             {/* Mobile */}
//             <div className='mb-4'>
//                 <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
//                 <input type="tel" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
//                     placeholder='Enter your Mobile Number' style={{ border:`1px solid ${borderColor}`}} onChange={(e)=>setMobile(e.target.value)}
//                     value={mobile} required/>
//             </div>
//             {/* Password */}
//             <div className='mb-4'>
//                 <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
//                 <div className="relative">
//                     <input type={`${showPassword?"text":"password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
//                     placeholder='Enter your password' style={{ border:`1px solid ${borderColor}`}} onChange={(e)=>setPassword(e.target.value)}
//                     value={password} required/>

//                     <button type="button" className="absolute right-3 cursor-pointer top-3.5 text-gray-500" onClick={()=> setShowPassword((prev)=>!prev)}>{!showPassword?<FaRegEye />:<FaRegEyeSlash />}</button>
//                 </div> 
//             </div>
//             {/* Role */}
//             <div className='mb-4'>
//                 <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
//                 <div className="flex gap-2">
//                     {["user", "seller", "deliveryBoy"].map((r)=>(
//                         <button key={r} className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors hover:bg-[#f5f1f0] cursor-pointer'
//                             onClick={()=>setRole(r)}
//                             style={
//                                 role === r?
//                                 {backgroundColor:primaryColor,color:"white"}:{border:`1px solid ${primaryColor}`,color:primaryColor}
//                             }>{r}</button>
//                     ))}
//                 </div> 
//             </div>

//             <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 
//             bg-[#ff4d2d] text-white hover:bg-[#fc8466] cursor-pointer`} onClick={handleSignUp} disabled={loading}> 
//                 {loading?<ClipLoader size={20}/>:"Sign Up"}</button>

//             {error && <p className='text-red-500 text-center my-[10px'>*{error}</p> }

//             <div className="flex items-center my-6">
//             <div className="grow border-t border-gray-300"></div>
//             <p className="mx-4 text-gray-400 text-sm">
//                 Or with Google
//             </p>
//             <div className="grow border-t border-gray-300"></div>
//             </div>

//             <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg cursor-pointer px-4 py-2 transition duration-400 border-gray-200 hover:bg-gray-200' onClick={handleGoogleAuth}>
//                 <FcGoogle size={20}/>
//                 <span>Sign Up with Google</span>
//             </button>

//             <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account? <span className='text-[#ff4d2d]'>Sign In</span></p>
//         </div>
//     </div>
//    );
// }

// export default SignUp


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

import signupImage from "../assets/signup.png"; // 👈 your image

function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile) return setError("Mobile number is required");
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data));
      navigate("/");
    } catch (err) {
      console.log(err);
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

        {/* 🔶 LEFT IMAGE SECTION */}
        <div className="hidden md:flex bg-[#ff4d2d] h-183 items-center justify-center">
          <img
            src={signupImage}
            alt="ApnaBazaar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 🔶 RIGHT FORM SECTION */}
        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-1 text-[#ff4d2d]">
            Apna<span className='text-[#16232A]'>Bazaar.</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Create your account to get all the features
          </p>

          {/* Full Name */}
          <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'> Full Name</label>
          <input
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {/* Email */}
          <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Mobile */}
          <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Mobile</label>
          <input
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          {/* Password */}
          <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Password</label>
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          {/* Role */}
          <div className="flex gap-2 mb-4">
            {["user", "seller", "deliveryBoy"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg border font-medium ${
                  role === r
                    ? "bg-[#ff4d2d] text-white"
                    : "border-[#ff4d2d] text-[#ff4d2d]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Sign Up */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full py-2 rounded-lg bg-[#ff4d2d] text-white font-medium"
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              * {error}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-400">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleAuth}
            className="w-full py-2 border rounded-lg flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Sign Up with Google
          </button>

          <p
            className="text-center mt-4 text-sm cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Already have an account?{" "}
            <span className="text-[#ff4d2d] font-medium">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
