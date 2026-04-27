import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateBookingStatusInStore } from '../redux/bookingSlice';

function SellerBookingCard({ booking }) {
    const [status, setStatus] = useState(booking.status);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleStatusUpdate = async (newStatus) => {
        setLoading(true);
        try {
            await axios.post(`${serverUrl}/api/booking/update-status/${booking._id}`, { status: newStatus }, { withCredentials: true });
            setStatus(newStatus);
            dispatch(updateBookingStatusInStore({ bookingId: booking._id, status: newStatus }));
        } catch (error) {
            alert("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden w-full max-w-2xl hover:shadow-lg transition duration-300">
            <div className="p-5 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <img src={booking.item.image} alt={booking.item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">{booking.item.name}</h3>
                            <p className="text-sm font-medium text-gray-400">Customer: {booking.name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                            status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <FaCalendarAlt className="text-[#ff4d2d]" /> {booking.date}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <FaClock className="text-[#ff4d2d]" /> {booking.time}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <FaPhone className="text-[#ff4d2d]" /> {booking.phoneno}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 col-span-2">
                            <FaMapMarkerAlt className="text-[#ff4d2d]" /> {booking.address}
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <div className="text-sm font-bold text-gray-900">₹{booking.totalAmount} <span className="text-[10px] font-normal text-gray-400">({booking.paymentMode})</span></div>
                        <div className="flex gap-2">
                            {status === 'Pending' && (
                                <button 
                                    disabled={loading}
                                    onClick={() => handleStatusUpdate('Confirmed')}
                                    className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition disabled:bg-gray-300"
                                >
                                    Confirm
                                </button>
                            )}
                            {status === 'Confirmed' && (
                                <button 
                                    disabled={loading}
                                    onClick={() => handleStatusUpdate('Completed')}
                                    className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition disabled:bg-gray-300"
                                >
                                    Complete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerBookingCard;
