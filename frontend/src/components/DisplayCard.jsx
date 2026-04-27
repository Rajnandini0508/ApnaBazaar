import React from 'react';
import { FaStar, FaRegStar, FaEye } from "react-icons/fa";

function DisplayCard({ data }) {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                (i <= rating) ? (<FaStar key={i} className='text-amber-400 text-sm' />) : (<FaRegStar key={i} className='text-amber-400 text-sm' />)
            )
        }
        return stars
    }

    return (
        <div className="w-[220px] group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
            <div className="h-[150px] w-full overflow-hidden relative">
                <img 
                    src={data.image} 
                    alt={data.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full border border-white/30">
                        <FaEye size={20} />
                    </span>
                </div>

            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
                <h1 className="font-bold text-gray-800 text-base group-hover:text-purple-600 transition-colors duration-300 truncate">
                    {data.name}
                </h1>
                
                <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">{renderStars(data.rating?.average || 0)}</div>
                    <span className="text-[12px] text-gray-500 font-medium tracking-tight">({data.rating?.count || 0})</span>
                </div>
            </div>
        </div>
    )
}

export default DisplayCard;
