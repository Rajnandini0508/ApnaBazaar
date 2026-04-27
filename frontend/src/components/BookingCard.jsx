import React, { useState } from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsCalendarCheck } from "react-icons/bs";
import BookingForm from './BookingForm';

function BookingCard({ data, shop }) {
    const [showForm, setShowForm] = useState(false);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                (i <= rating) ? (<FaStar key={i} className='text-yellow-500 text-lg' />) : (<FaRegStar key={i} className='text-yellow-500 text-lg' />)
            )
        }
        return stars
    }

    return (
        <>
            <div className="w-[210px] rounded-xl border border-[#ff4d2d] bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-[120px] w-full overflow-hidden rounded-t-xl">
                    <img src={data.image} alt={data.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>

                <div className="p-3 flex flex-col gap-1 flex-1">
                    <h1 className="font-semibold text-gray-900 text-sm truncate">
                        {data.name}
                    </h1>
                    <div className="flex items-center gap-1">{renderStars(data.rating?.average || 0)}
                        <span className="text-xs text-gray-500">({data.rating?.count || 0})</span>
                    </div>
                </div>

                <div className="px-3 pb-3 flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-base">₹{data.price}</span>
                    <div className="flex items-center border rounded-full overflow-hidden">
                        <button
                            className="px-4 py-2 bg-[#ff4d2d] text-white hover:bg-orange-600 transition flex items-center gap-2"
                            onClick={() => setShowForm(true)}
                        >
                            <BsCalendarCheck size={15} />
                            <span className="text-xs font-bold uppercase">Book</span>
                        </button>
                    </div>
                </div>
            </div>

            {showForm && (
                <BookingForm
                    shop={shop}
                    item={data}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {}}
                />
            )}
        </>
    )
}

export default BookingCard;
