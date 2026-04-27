import React, { useRef, useState, useEffect } from 'react'
import Nav from "./Nav.jsx"
import { useNavigate } from 'react-router-dom'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import FoodCard from './FoodCard'
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { useSelector } from 'react-redux'
import basketImage from "../assets/Wide_Assortment.png";
import banner from "../assets/banner3.png";
import bannerMobile from '../assets/mobilebanner.png'
import ShopCard from "./ShopCard";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import girlAvatar from "../assets/girl.png";
import boyAvatar1 from "../assets/boy.png";
import boyAvatar2 from "../assets/boy2.png";
import girlAvatar2 from "../assets/girl2.png";

const REVIEWS = [
    {
        name: "Jenny",
        bg: "bg-[#FFD3A5]",
        img: girlAvatar,
        text: "Very convenient for everyday essentials. Saves so much time!",

    },
    {
        name: "JP Gupta",
        bg: "bg-[#FFEAD1]",
        img: boyAvatar1,
        text: "Google Maps location was accurate. Easy to find the shop.",
    },
    {
        name: "John Doe",
        bg: "bg-[#FFD3A5]",
        img: boyAvatar2,
        text: "Smooth payment through UPI and hassle-free pickup.",
    },
    {
        name: "Alisha",
        bg: "bg-[#FFEAD1]",
        img: girlAvatar2,
        text: "Loved the service — local shops becoming digital is amazing!",
    },
];


function UserDashboard() {
    const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(state => state.user)
    const cateScrollRef = useRef()
    const shopScrollRef = useRef()
    const navigate= useNavigate()
    const [showLeftCateButton, setShowLeftCateButton] = useState(false)
    const [showRightCateButton, setShowRightCateButton] = useState(false)
    const [showLeftShopButton, setShowLeftShopButton] = useState(false)
    const [showRightShopButton, setShowRightShopButton] = useState(false)
    const [updatedItemsList,setUpdatedItemsList]= useState([])

    const handleFilerterByCategory=(category)=>{
        if(category=="All"){
            setUpdatedItemsList(itemsInMyCity)
        } else {
            const filteredList=itemsInMyCity?.filter(i=>i.category===category)
            setUpdatedItemsList(filteredList)
        }
    }

    useEffect(()=> {
        setUpdatedItemsList(itemsInMyCity)
    },[itemsInMyCity])

    const updateButton = (ref, setLeftButton, setRightButton) => {
        const element = ref.current
        if (element) {
            setLeftButton(element.scrollLeft > 0)
            setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
        }
    }

    const scrollHandler = (ref, direction) => {
        if (ref.current) {
            ref.current.scrollBy({
                left: direction == "left" ? -200 : 200,
                behavior: "smooth"
            })
        }
    }

    useEffect(() => {
        if (cateScrollRef.current) {
            updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
            updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)
            cateScrollRef.current.addEventListener('scroll', () => {
                updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
            })
            shopScrollRef.current.addEventListener('scroll', () => {
                updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)
        })
    }
    

        return () => {
            cateScrollRef?.current?.removeEventListener("scroll", () => {
                updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
            })
            shopScrollRef?.current?.removeEventListener("scroll", () => {
                updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)
            })
        }

    }, [categories])

    return (
        <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff96f6] overflow-y-auto'>
            <Nav />

            {searchItems && searchItems.length>0 && (
                <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4'>
                    <h1 className='text-gray-900 text-2xl sm:text-xl font-semibold border-b border-gray-200 pb-2'>Seach Results</h1>
                    <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>{searchItems.map((item)=>(
                        <FoodCard data={item} key={item._id}/>
                    ))}</div>
                </div>   
            )}

            <div className="container mx-auto">
                <div className="w-full h-full min-h-48 ">
                    <img src={banner} className="w-full h-full rounded-xl hidden lg:block" alt="banner" />
                    <img src={bannerMobile} className="w-full h-full lg:hidden" alt="banner" />
                    <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth", })}
                        className="absolute left-8 top-[10%] -translate-y-1/2 md:left-23 md:top-[53%] bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#ff8e7a] hover:scale-105 transition duration-300">Learn More</button>
                </div>
            </div>

            <div className='w-full max-w-6xl flex flex-col gap-5 items-center p-[10px]'>
                <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>Featured Categories</h1>
                <div className='w-full relative'>
                    {showLeftCateButton &&
                        <button className='absolute letf-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
                            onClick={() => scrollHandler(cateScrollRef, "left")}><CiCircleChevLeft /></button>}
                    <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={cateScrollRef}>
                        {categories.map((cate, index) => (
                            <CategoryCard name={cate.category} image={cate.image} key={index} onClick={()=>handleFilerterByCategory(cate.category)}/>
                        ))}
                    </div>
                    {showRightCateButton &&
                        <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
                            onClick={() => scrollHandler(cateScrollRef, "right")}><CiCircleChevRight /></button>}
                </div>
            </div>

            <div className="container mx-auto  mt-3 bg-[#1b212c] text-white rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch">
                <div className="flex-1 px-6 py-5 flex flex-col justify-center">
                    <p className="text-lg md:text-2xl font-semibold leading-snug">
                        Explore trusted local stores offering what you need, close to you
                    </p>
                    <button className="mt-4 bg-[#ff4d2d] text-[#fff] font-bold px-5 py-2 rounded-md w-fit hover:bg-[#f38e7c] transform hover:scale-125 transition duration-300">
                        Explore
                    </button>
                </div>

                <div className="flex-1 flex items-end justify-end pr-4 pb-1 ">
                    <img
                        src={basketImage}
                        alt="basket"
                        className="max-h-40 md:max-h-48 object-contain"
                    />
                </div>
            </div>

            <div className='w-full max-w-6xl flex flex-col gap-5 items-center p-[10px]'>
                <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>Popular Shop in {currentCity}</h1>
                <div className='w-full relative'>
                    {showLeftShopButton &&
                        <button className='absolute letf-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
                            onClick={() => scrollHandler(shopScrollRef, "left")}><CiCircleChevLeft /></button>}
                    <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={shopScrollRef}>
                        {shopInMyCity?.map((shop, index) => (
                            <ShopCard shop={shop} key={index} onClick={()=>navigate(`/shop/${shop._id}`)}/>
                        ))}
                    </div>
                    {showRightShopButton &&
                        <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
                            onClick={() => scrollHandler(shopScrollRef, "right")}><CiCircleChevRight /></button>}
                </div>
            </div >

            <div className='w-full max-w-6xl flex flex-col gap-5 items-center p-[10px]'>
                <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>Suggested Food Items</h1>
                <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
                    {updatedItemsList?.map((item, index) => (
                        <FoodCard key={index} data={item} />
                    ))}
                </div>
            </div>
            <div className="w-full py-12">
                <div className="container mx-auto px-4 max-w-6xl">

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
                        Recent Activity
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                        {REVIEWS.map((item) => {
                            const isGreen = item.bg === "bg-[#7b9a5e]";
                            const textColor = isGreen ? "text-white" : "text-gray-800";
                            const subText = isGreen ? "text-white/80" : "text-gray-500";

                            return (
                                <div
                                    key={item.name}
                                    className={`
              ${item.bg}
              rounded-2xl
              p-5
              shadow-md
              border
              border-orange-300
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            `}
                                >
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="h-11 w-11 rounded-full object-cover border-2 border-white"
                                        />
                                        <div>
                                            <p className={`font-semibold text-base ${textColor}`}>
                                                {item.name}
                                            </p>
                                            <p className={`text-xs ${subText}`}>
                                                Wrote a review
                                            </p>
                                        </div>
                                    </div>

                                    {/* Review */}
                                    <p className={`text-sm leading-relaxed mb-4 ${textColor}`}>
                                        {item.text}
                                    </p>

                                    {/* Stars */}
                                    <div className="flex gap-1 text-[#ff4d2d] text-sm">
                                        ★ ★ ★ ★
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>



            <div className="container mx-auto mt-10">
                <h2 className="text-2xl font-bold text-[#0c3b2e] mb-3">About Us</h2>
                <p className="text-slate-700 font-medium leading-relaxed mb-2">
                    Welcome to ApnaBazaar, your one-stop digital market where you can
                    explore nearby shops, check product availability, and reserve items —
                    all in just a few clicks. We simplify local shopping by bringing shop listings, locations,
                    categories, and secure UPI payments together in one place.
                </p>
                <p className="text-slate-800 font-medium leading-relaxed mt-3">
                    <span>Your market, your way.</span>
                    <br />
                    <span>Anytime. Anywhere.</span>
                </p>
            </div>
            {/* <footer className='border-t text-gray-700'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <p className='text-sm text-gray-700 items-start justify-start'>© All Rights Reserved 2024.</p>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href='' className='text-[#ff4d2d] hover:bg-gray-300'>
                    <FaFacebook size={20}/>
                </a>
                <a href='' className='text-[#ff4d2d] hover:bg-gray-300'>
                    <FaInstagram size={20}/>
                </a>
                <a href='' className='text-[#ff4d2d] hover:bg-gray-300'>
                    <FaLinkedin size={20}/>
                </a>
            </div>
        </div>
    </footer> */}
            <footer className="border-t bg-white">
                <div className="container mx-auto px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Left text */}
                    <p className="text-sm text-gray-600 text-center sm:text-left">
                        © 2024 ApnaBazaar. All Rights Reserved.
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="https://github.com/Rajnandini0508"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="w-9 h-9 flex items-center justify-center rounded-full 
                   bg-[#fff2ec] text-[#ff4d2d]
                   hover:bg-[#ff4d2d] hover:text-white
                   transition-all duration-300"
                        >
                            <FaGithub size={16} />
                        </a>

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="w-9 h-9 flex items-center justify-center rounded-full 
                   bg-[#fff2ec] text-[#ff4d2d]
                   hover:bg-[#ff4d2d] hover:text-white
                   transition-all duration-300"
                        >
                            <FaInstagram size={16} />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/rajnandini-gupta0508"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-9 h-9 flex items-center justify-center rounded-full 
                   bg-[#fff2ec] text-[#ff4d2d]
                   hover:bg-[#ff4d2d] hover:text-white
                   transition-all duration-300"
                        >
                            <FaLinkedin size={16} />
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default UserDashboard


