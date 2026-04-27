import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function BookingForm({ shop, item, onClose, onSuccess }) {
    const [name, setName] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMode, setPaymentMode] = useState('COD');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const openRazorpayWindow = (bookingId, razorOrder) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: razorOrder.amount,
            currency: 'INR',
            name: "ApnaBazaar",
            description: `Booking for ${item.name}`,
            order_id: razorOrder.id,
            handler: async function (response) {
                try {
                    await axios.post(`${serverUrl}/api/booking/verify-payment`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        bookingId
                    }, { withCredentials: true });
                    onSuccess();
                    onClose();
                    navigate("/booking-confirmed");
                } catch (err) {
                    setError("Payment verification failed");
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const bookingData = {
                shopId: shop._id, itemId: item._id,
                name, phoneno, date, time, address,
                paymentMode: paymentMode === 'COD' ? 'COD' : 'Online',
                totalAmount: item.price
            };

            const result = await axios.post(`${serverUrl}/api/booking/place-booking`, bookingData, { withCredentials: true });

            if (paymentMode === 'Online') {
                const bookingId = result.data.bookingId;
                const razorOrder = result.data.razorOrder;
                openRazorpayWindow(bookingId, razorOrder);
            } else {
                onSuccess();
                onClose();
                navigate("/booking-confirmed");
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Booking failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-orange-100">
                <div className="bg-[#ff4d2d] p-4 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Confirm Booking</h2>
                        <p className="text-xs opacity-90">{item.name} @ {shop.name}</p>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
                        <IoClose size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                        <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4d2d] outline-none transition" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Mobile Number</label>
                        <input required type="tel" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4d2d] outline-none transition" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} placeholder="Enter phone number" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</label>
                            <input required type="date" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4d2d] outline-none transition" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Time</label>
                            <input required type="time" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4d2d] outline-none transition" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Service Address</label>
                        <textarea required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4d2d] outline-none h-20 resize-none transition" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Where should the service be provided?" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Payment Method</label>
                        <div className="flex gap-4 mt-2">
                            <label className={`flex-1 flex items-center justify-center gap-2 p-2 border rounded-xl cursor-pointer transition ${paymentMode === 'COD' ? 'border-[#ff4d2d] bg-orange-50 text-[#ff4d2d]' : 'border-gray-200 text-gray-500'}`}>
                                <input type="radio" name="payment" value="COD" checked={paymentMode === 'COD'} onChange={(e) => setPaymentMode(e.target.value)} className="hidden" />
                                <span className="text-sm font-bold">COD</span>
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 p-2 border rounded-xl cursor-pointer transition ${paymentMode === 'Online' ? 'border-[#ff4d2d] bg-orange-50 text-[#ff4d2d]' : 'border-gray-200 text-gray-500'}`}>
                                <input type="radio" name="payment" value="Online" checked={paymentMode === 'Online'} onChange={(e) => setPaymentMode(e.target.value)} className="hidden" />
                                <span className="text-sm font-bold">Online</span>
                            </label>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}

                    <button disabled={loading} type="submit" className="w-full bg-[#ff4d2d] text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-[#e64528] hover:scale-[1.02] transition transform active:scale-95 disabled:bg-gray-400">
                        {loading ? <ClipLoader size={20} color="#fff" /> : `Book for ₹${item.price}`}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BookingForm;
