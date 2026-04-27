import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import UserOrderCard from '../components/UserOrderCard';
import SellerOrderCard from '../components/SellerOrderCard'
import { setMyOrders,updateRealtimeOrderStatus } from '../redux/userSlice'

function MyOrders() {
    const {userData,myOrders,socket}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
        socket?.on('newOrder',(data)=>{
            if(data.shopOrders?.seller._id==userData._id){
                dispatch(setMyOrders([data,...myOrders]))
            }
        })

        socket?.on('update-status',({orderId,shopId,status,userId})=>{
            if(userId==userData._id){
                dispatch(updateRealtimeOrderStatus({
                    orderId,shopId,status
                }))
            }
        })

        return ()=>{
            socket?.off('newOrder')
            socket?.off('update-status')
        }
    },[socket])

    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
            <div className='w-full max-w-[800px] p-4'>
                <div className='flex items-center gap-[20px] mb-6'>
                    <div className="z-[10] cursor-pointer" onClick={() => navigate("/")}>
                        <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
                    </div>
                    <h1 className='text-2xl font-bold text-start'>My Orders</h1>
                </div> 

                {(!userData || userData.role !== 'seller') ? (
                    <div className='flex gap-4 mb-6'>
                        <button 
                            className='flex-1 py-2 rounded-xl font-bold bg-[#ff4d2d] text-white shadow-md'
                            onClick={() => navigate("/my-orders")}
                        >
                            Orders
                        </button>
                        <button 
                            className='flex-1 py-2 rounded-xl font-bold bg-white text-gray-600 border border-gray-200'
                            onClick={() => navigate("/my-bookings")}
                        >
                            Bookings
                        </button>
                    </div>
                ) : null}

                {myOrders?.length === 0 && (<p className="text-center text-gray-500 mt-10">You have no orders yet</p>)}

                <div className='space-y-6'>
                    {myOrders?.map((order,index)=>(
                        userData?.role==="user" ? (
                            <UserOrderCard data={order} key={index}/>
                        ):userData?.role==="seller" ? (
                            <SellerOrderCard data={order} key={index}/>
                        ):null
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyOrders