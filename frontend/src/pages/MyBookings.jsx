import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaPhone, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { serverUrl } from '../App';
import { setBookings, updateBookingStatusInStore } from '../redux/bookingSlice';

function MyBookings() {
    const { userData, socket } = useSelector(state => state.user);
    const { myShopData } = useSelector(state => state.seller);
    const { bookings } = useSelector(state => state.booking);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/booking/my-bookings`, { withCredentials: true });
                dispatch(setBookings(res.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookings();
    }, [dispatch]);

    useEffect(() => {
        socket?.on('booking-update', ({ bookingId, status }) => {
            dispatch(updateBookingStatusInStore({ bookingId, status }));
        });
        return () => {
            socket?.off('booking-update');
        };
    }, [socket, dispatch]);

    const statusColors = {
        Pending: 'bg-yellow-100 text-yellow-700',
        Confirmed: 'bg-blue-100 text-blue-700',
        Completed: 'bg-green-100 text-green-700',
        Cancelled: 'bg-red-100 text-red-700'
    };

    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
            <div className='w-full max-w-[800px] p-4 mt-20'>
                <div className='flex items-center gap-[20px] mb-6'>
                    <div className="z-[10] cursor-pointer" onClick={() => navigate("/")}>
                        <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
                    </div>
                    <h1 className='text-2xl font-bold'>My Bookings</h1>
                </div>

                {(!userData || userData.role !== 'seller') ? (
                    <div className='flex gap-4 mb-6'>
                        <button 
                            className='flex-1 py-2 rounded-xl font-bold bg-white text-gray-600 border border-gray-200'
                            onClick={() => navigate("/my-orders")}
                        >
                            Orders
                        </button>
                        <button 
                            className='flex-1 py-2 rounded-xl font-bold bg-[#ff4d2d] text-white shadow-md'
                            onClick={() => navigate("/my-bookings")}
                        >
                            Bookings
                        </button>
                    </div>
                ) : null}

                {bookings.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 font-medium">No bookings found</p>
                        <button onClick={() => navigate("/")} className="mt-4 text-[#ff4d2d] font-bold hover:underline">Book a service now</button>
                    </div>
                )}

                <div className='space-y-6'>
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition duration-300">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                                    <img src={booking.item.image} alt={booking.item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-800">{booking.item.name}</h3>
                                            <p className="text-sm text-[#ff4d2d] font-bold uppercase tracking-tight">{booking.shop?.name || "Service Center"}</p>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[booking.status]}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-3"><FaCalendarAlt className="text-[#ff4d2d]" /> {booking.date}</div>
                                        <div className="flex items-center gap-3"><FaClock className="text-[#ff4d2d]" /> {booking.time}</div>
                                        <div className="flex items-center gap-3 col-span-1 sm:col-span-2"><FaMapMarkerAlt className="text-[#ff4d2d]" /> {booking.address}</div>
                                    </div>
                                    <div className="mt-6 pt-5 border-t border-dashed flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Booking ID</span>
                                            <span className="text-xs font-mono text-gray-500">#{booking._id.slice(-8).toUpperCase()}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block">Total Amount</span>
                                            <span className="text-lg font-bold text-gray-900">₹{booking.totalAmount} <span className="text-xs font-normal text-gray-400">({booking.paymentMode})</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyBookings;
