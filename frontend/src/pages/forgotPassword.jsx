import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
    const [step,setStep]=useState(1)
    const [email,setEmail]=useState("")
    const [otp,setOtp]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)

    const handleSendOtp=async () => {
        setLoading(true)
        try {
            const result=await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
            console.log(result)
            setError("")
            setStep(2)
            setLoading(false)
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

     const handleVerifyOtp=async () => {
        setLoading(true)
        try {
            const result=await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
            console.log(result)
            setError("")
            setStep(3)
            setLoading(false)
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

     const handleResetPassword=async () => {
        setLoading(true)
        if(newPassword!=confirmPassword){
            return null
        }
        try {
            const result=await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
            console.log(result)
            setError("")
            setLoading(false)
            navigate("/signin")
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-4'>
                    <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer'
                        onClick={()=>navigate("/signin")}/>
                    <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
                </div>
                <div>
                    {step == 1 && 
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                            <input type="email" className='w-full border- [1px] border-gray-200 rounded-lg px-3 py-2 focus: outline-none'
                                placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                        </div>
                        <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 
                            bg-[#ff4d2d] text-white hover:bg-[#fc8466] cursor-pointer`} onClick={handleSendOtp} disabled={loading}> {loading?<ClipLoader size={20} color='white'/>:"Send Otp"}</button>

                            {error && <p className='text-red-500 text-center my-[10px'>*{error}</p> }

                    </div>}

                    {step == 2 && 
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>OTP</label>
                            <input type="email" className='w-full border- [1px] border-gray-200 rounded-lg px-3 py-2 focus: outline-none'
                                placeholder='Enter Otp' onChange={(e)=>setOtp(e.target.value)} value={otp} required/>
                        </div>
                        <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 
                            bg-[#ff4d2d] text-white hover:bg-[#fc8466] cursor-pointer`} onClick={handleVerifyOtp} disabled={loading}> {loading?<ClipLoader size={20} color='white'/>:"Verify"}</button>

                            {error && <p className='text-red-500 text-center my-[10px'>*{error}</p> }

                    </div>}

                    {step == 3 && 
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
                            <input type="password" className='w-full border- [1px] border-gray-200 rounded-lg px-3 py-2 focus: outline-none'
                                placeholder='Enter new password' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} required/>
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="confirmPassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                            <input type="password" className='w-full border- [1px] border-gray-200 rounded-lg px-3 py-2 focus: outline-none'
                                placeholder='Enter confirm password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
                        </div>
                        <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 
                            bg-[#ff4d2d] text-white hover:bg-[#fc8466] cursor-pointer`} onClick={handleResetPassword} disabled={loading}>{loading?<ClipLoader size={20} color='white'/>:"Reset Password"}</button>

                            {error && <p className='text-red-500 text-center my-[10px'>*{error}</p> }
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword