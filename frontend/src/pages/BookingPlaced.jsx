import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

function BookingPlaced() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center animate-in zoom-in duration-500">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 animate-bounce">
                        <FaCheckCircle size={60} />
                    </div>
                </div>
                
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Booking Confirmed!</h1>
                <p className="text-gray-500 mb-8">Your service request has been successfully sent to the shop. They will review and confirm your slot shortly.</p>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                    <div className="flex items-center justify-center gap-3 text-[#ff4d2d] font-bold mb-2">
                        <FaCalendarAlt />
                        <span>Appointment Status</span>
                    </div>
                    <p className="text-sm text-gray-600">You can track your booking status in the "My Bookings" section.</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate("/my-bookings")}
                        className="w-full bg-[#ff4d2d] text-white py-3 rounded-xl font-bold hover:bg-[#e64528] transition flex items-center justify-center gap-2"
                    >
                        Track My Booking <FaArrowRight size={14} />
                    </button>
                    <button 
                        onClick={() => navigate("/")}
                        className="w-full bg-white text-gray-600 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingPlaced;
