import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Nav from "./Nav.jsx"
import { useSelector } from 'react-redux'
import { serverUrl } from '../App'
import DeliveryBoyTracking from './DeliveryBoyTracking'
import { ResponsiveContainer,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Bar } from 'recharts'
import { ClipLoader } from 'react-spinners'

function DeliveryBoy() {
    const {userData,socket}=useSelector(state=>state.user)
    const [currentOrder,setCurrentOrder]=useState("")
    const [showOtpBox,setShowOtpBox]=useState(false)
    const [availableAssignments,setAvailableAssignments]=useState("")
    const [otp,setOtp]=useState("")
    const [todayDeliveries,setTodayDeliveries]=useState([])
    const [deliveryBoyLocation,setDeliveryBoyLocation]=useState("")
    const [loading,setLoading]=useState(false)
    const [message,setMessage]=useState("")
    const [areaName, setAreaName] = useState("Fetching area...")

    useEffect(()=>{
        if(!socket || userData.role!=="deliveryBoy") return
        let watchId
        if(navigator.geolocation){
            watchId=navigator.geolocation.watchPosition((position)=>{
                const latitude=position.coords.latitude
                const longitude=position.coords.longitude
                setDeliveryBoyLocation({lat:latitude,lon:longitude})
                socket.emit('updateLocation',{
                    userId: userData._id,
                    latitude,
                    longitude
                })
            }),
            (error)=>{
                console.log(error)
            },{ enableHighAccuracy:true }  
        }
        return ()=>{
            if(watchId) navigator.geolocation.clearWatch(watchId)
        }
    },[socket,userData])

    useEffect(() => {
        const fetchAreaName = async () => {
            if (deliveryBoyLocation.lat && deliveryBoyLocation.lon) {
                try {
                    const apiKey = import.meta.env.VITE_GEOAPIKEY;
                    const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${deliveryBoyLocation.lat}&lon=${deliveryBoyLocation.lon}&format=json&apiKey=${apiKey}`);
                    const data = await response.json();
                    if (data.results && data.results.length > 0) {
                        setAreaName(data.results[0].address_line2 || data.results[0].city || "Unknown Area");
                    }
                } catch (error) {
                    console.log("Error fetching area name:", error);
                }
            }
        };
        fetchAreaName();
    }, [deliveryBoyLocation]);
    
    const ratePerDelivery=50
    const totalEarning=todayDeliveries.reduce((sum,d)=>sum + d.count * ratePerDelivery,0)

    const getAssignments=async()=> {
        try {
            const result=await axios.get(`${serverUrl}/api/order/get-assignments`,
                {withCredentials:true})   
            setAvailableAssignments(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCurrentOrder=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/order/get-current-order`,
                {withCredentials:true})
            setCurrentOrder(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const accepOrder=async (assignmentId)=>{
        try {
            const result=await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`,
                {withCredentials:true})
            console.log(result.data)
            await getCurrentOrder()
        } catch (error) {
            console.log(error)
        }
    }

     const sendOtp=async ()=>{
        setLoading(true)
        try {
            const result=await axios.post(`${serverUrl}/api/order/send-delivery-otp`,{
                orderId:currentOrder._id, shopOrderId:currentOrder.shopOrder._id},
                {withCredentials:true})
            setLoading(false)
            setShowOtpBox(true) 
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

     const verifyOtp=async ()=>{
        setMessage("")
        try {
            const result=await axios.post(`${serverUrl}/api/order/verify-delivery-otp`,
               {orderId:currentOrder._id, shopOrderId: currentOrder.shopOrder._id,otp}, {withCredentials:true})
            console.log(result.data)
            setMessage(result.data.message)
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleTodayDeliveries=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/order/get-today-deliveries`,
               {withCredentials:true})
            
            console.log(result.data)
            setTodayDeliveries(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        socket?.on('newAssignment',(data)=>{
            if(data.sendTo==userData._id){
                setAvailableAssignments(prev=>[...prev,data])
            }
        })
        return ()=>{
            socket?.off('newAssignment')
        }
    },[socket])

    useEffect(()=>{
        getAssignments()
        getCurrentOrder()
        handleTodayDeliveries()
    },[userData])

    return (
        <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff96f6] overflow-y-auto'>
            <Nav/>
            <div className='w-full max-w-[800px] flex flex-col gap-5 items-center'>
                <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2'>
                    <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome, {userData.fullName}</h1>
                    <div className='flex flex-col gap-1'>
                        <p className='text-gray-700 font-medium'><span className='text-[#ff4d2d]'>Area:</span> {areaName}</p>
                        <p className='text-xs text-gray-400'><span className='font-semibold'>Lat:</span> {deliveryBoyLocation.lat?.toFixed(4)}, <span className='font-semibold'>Lon:</span> {deliveryBoyLocation.lon?.toFixed(4)}</p>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-md p-5 w-[90%] mb-6 border border-orange-100'>
                    <h1 className='text-lg font-bold mb-3 text-[#ff4d2d]'>Today Deliveries</h1>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={todayDeliveries}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="hour" tickFormatter={(h)=>`${h}:00`}/>
                            <YAxis allowDecimals={false}/>
                            <Tooltip formatter={(value)=>[value,"orders"]} labelFormatter={(label=>`${label}:00`)}/>
                            <Bar dataKey="count" fill='#ff4d2d'/>
                        </BarChart>
                    </ResponsiveContainer>

                    <div className='max-w-sm mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg text-center'>
                        <h1 className='text-xl font-semibold text-gray-800 mb-2'>Today's Earning</h1>
                        <span className='text-2xl font-bold text-green-600'>₹{totalEarning}</span>
                    </div>
                </div>

                {!currentOrder &&
                <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
                    <h1 className='text-lg font-bold mb-4 flex items-center gap-2'>Available Orders</h1>
                    <div className='space-y-4'>
                        {availableAssignments?.length>0?(availableAssignments.map((a,index)=>(
                            <div className='border rounded-lg p-4 flex justify-between items-center' key={index}>
                                <div>
                                <p className='text-sm font-semibold'>{a.shopName}</p>
                                <p className='text-sm text-gray-500'><span className='font-semibold'>Delivery Address:</span> {a.deliveryAddress.text}</p>
                                <p className='text-xs text-gray-400'>{a.items.length} items | {a.subtotal}</p>
                                </div>
                                <button className='bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600'
                                onClick={()=>accepOrder(a.assignmentId)}>Accept</button>
                            </div>
                        ))):<p className='text-gray-400 text-sm'>No Available Orders</p>}
                    </div>
                </div>}

                {currentOrder &&
                <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border-orange-100'>
                    <h2 className='text-lg font-bold mb-3'>📦 Current Order</h2>
                    <div className='border rounded-lg p-4 mb-3'>
                        <p className='font-semibold text-sm'>{currentOrder?.shopOrder.shop.name}</p>
                        <p className='text-sm text-gray-500'>{currentOrder.deliveryAddress.text}</p>
                        <p className='text-xs text-gray-400'>{currentOrder.shopOrder.shopOrderItems.length} item | {currentOrder.shopOrder.subtotal}</p>
                    </div>

                <DeliveryBoyTracking data={{
                    deliveryBoyLocation: deliveryBoyLocation || {
                        lat:userData.location.coordinates[1],
                        lon:userData.location.coordinates[0]
                    },
                    customerLocation:{
                        lat:currentOrder.deliveryAddress.latitude,
                        lon:currentOrder.deliveryAddress.longitude
                    }}
                }/>
                {!showOtpBox ? 
                <button className='mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md
                hover:bg-green-600 active:scale-95 transition-all duration-200' 
                onClick={sendOtp} disabled={loading}>{loading?<ClipLoader size={20} color='white'/>:"Mark As Delivered"}</button>:

                <div className='mt-4 p-4 border rounded-xl bg-gray-50'>
                    <p className='text-sm font-semibold mb-2'>Enter Otp Send to <span className='text-orange-500'>{currentOrder.user.fullName}</span></p>
                    <input type="text" className='w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400' placeholder='Enter OTP'
                    onChange={(e)=>setOtp(e.target.value)} value={otp}/>
                    {message && <p className='text-center text-green-400'>{message}</p>}

                    <button className='w-full bg-[#ff4d2d] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all'
                    onClick={verifyOtp}>Submit OTP</button>
                </div>}
                </div>}
            </div>
        </div>
    )
}

export default DeliveryBoy





