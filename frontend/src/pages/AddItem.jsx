import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi"
import { serverUrl } from '../App'
import axios from 'axios'
import { setMyShopData } from '../redux/sellerSlice'
import ClipLoader from "react-spinners/ClipLoader";


function AddItem(){
    const navigate=useNavigate()
    const {myShopData}=useSelector(state=>state.seller)
    const [loading,setLoading]=useState(false)
    const [name,setName]=useState("")
    const [price,setPrice]=useState(0)
    const [category,setCategory]=useState("")
    const [image, setImage] = useState(null);
    const categories=["Vegetable",
                "Footwear",
                "Grocery",
                "Stationery",
                "Bakery",
                "Pharmacy",         
                "Electronic",     
                "Cafe",
                "Fashion",
                "Cosmetics",
                "Generalstore",
                "Tailor",
                "Salon",
                "Others"]
    const dispatch=useDispatch()
    const shopMode = myShopData?.mode || "Order"


    const handleSubmit=async (e)=> {
        e.preventDefault()
         if (!image) {
            alert("Please select an image");
            return;
        }
          if (!name || !category) {
            alert("Name and category are required");
            return;
          }
          if (shopMode !== "Display" && !price) {
            alert("Price is required for this shop mode");
            return;
          }
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("image", image); 

               const result=await axios.post(`${serverUrl}/api/item/add-item`,formData, 
                {withCredentials:true,
                    
                })
            dispatch(setMyShopData(result.data))
            // setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen'>
            <div className='absolute top-[20px] left-[20px] z-[10] mb-[10px]' onClick={()=>navigate("/")}>
                <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]'/>
            </div>
            <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-orange-100 p-4 rounded-full mb-4'>
                        <GiShoppingBag className='text-[#ff4d2d] w-16 h-16' />
                    </div>
                    <div className='text-3xl font-extrabold text-gray-900'>
                        {shopMode === "Booking" ? "Add Service" : "Add Item"}
                    </div>
                </div>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            {shopMode === "Booking" ? "Service Name" : "Item Name"}
                        </label>
                        <input type="text" placeholder={shopMode === "Booking" ? 'Enter Service Name' : 'Enter Item Name'} className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                        onChange={(e)=>setName(e.target.value)} value={name} />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Item Image</label>
                        <input type="file" accept='image/*' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                         onChange={(e)=>setImage(e.target.files[0])} />
                         {image && <div className='mt-4'> 
                            <img src={URL.createObjectURL(image)} alt="" className='w-full h-48 object-cover rounded-lg border'/>
                         </div>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Price {shopMode === "Display" && "(Optional)"}
                        </label>
                        <input type="number" placeholder='0' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                        onChange={(e)=>setPrice(e.target.value)} value={price} />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
                        <select className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                        onChange={(e)=>setCategory(e.target.value)} value={category}>
                            <option value="">Select Category</option>
                            {categories.map((cate,index)=>(
                                <option value={cate} key={index}>{cate}</option>
                            ))}
                        </select>
                    </div>

                    <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all cursor-pointer'
                    disabled={loading}>
                        {loading?<ClipLoader size={20} color='white'/>:"Save"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddItem