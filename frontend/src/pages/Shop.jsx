import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { FaStore } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidShoppingBags } from "react-icons/bi";
import FoodCard from '../components/FoodCard'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

function Shop() {
    const { shopId } = useParams()
    const [items, setItems] = useState([])
    const [shop, setShop] = useState([])
    const navigate = useNavigate()

    const handleShop = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`
                , { withCredentials: true })
            setShop(result.data.shop)
            setItems(result.data.items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleShop()
    }, [shopId])

    return (
        <div className='min-h-screen bg-gray-50'>
            <button className='absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/30 hover:bg-black/90 text-white px-3 py-2 rounded-full shadow transition'
                onClick={() => navigate("/")}><IoIosArrowRoundBack size={30} /></button>

            {shop && <div className='relative w-full h-64 md:h-80 lg:h-96'>
                <img src={shop.image} alt="" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col justify-center items-center text-center px-4'>
                    <FaStore className='text-white text-4xl mb-3 drop-shadow-md' />
                    <h1 className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg'>{shop.name}</h1>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-[10px] hover:scale-105 transition-transform duration-200'
                    >
                        <FaLocationDot size={22} color='#ff4d2d' />
                        <p className='text-lg font-medium text-gray-200 mt-[10px] hover:text-[#ff4d2d] underline-offset-4 hover:underline cursor-pointer'>{shop.address}</p>
                    </a>
                    <a
                        href={`tel:${shop.phoneno}`}
                        className='flex items-center gap-[10px] hover:scale-105 transition-transform duration-200'
                    >
                        <FaPhone size={20} color='#ff4d2d' />
                        <h2 className='text-lg font-medium text-gray-200 hover:text-[#ff4d2d] mt-[10px] cursor-pointer'>{shop.phoneno}</h2>
                    </a>
                </div>
            </div>}

            <div className='max-w-7xl mx-auto px-6 py-10'>
                <h2 className='flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800'>
                    <BiSolidShoppingBags color='red' /> Our Items
                </h2>
                {items.length > 0 ? (
                    <div className='flex flex-wrap justify-center gap-8'>{items.map((item) => (
                        <FoodCard data={item} />
                    ))}</div>
                ) : <p>No Items Available</p>}
            </div>
        </div>
    )
}

export default Shop