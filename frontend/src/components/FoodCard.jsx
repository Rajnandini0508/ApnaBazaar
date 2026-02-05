import React, {useState} from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../redux/userSlice'


function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.user)

  const renderStars=(rating)=>{
        const stars=[];
        for(let i=1; i<=5; i++){
            stars.push(
               (i<=rating)?(<FaStar className='text-yellow-500 text-lg'/>):(<FaRegStar className='text-yellow-500 text-lg'/>)
            )
        }
        return stars
    }

  return (
    <div className="w-[210px]  rounded-xl border border-[#ff4d2d] bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="h-[120px] w-full overflow-hidden rounded-t-xl">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
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
          <button className="px-2 py-1 hover:bg-gray-100" onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
            <FaMinus size={10} />
          </button>

          <span className="px-2 text-sm">{quantity}</span>

          <button className="px-2 py-1 hover:bg-gray-100" onClick={() => setQuantity(quantity + 1)}>
            <FaPlus size={10} />
          </button>

          <button className={`px-3 py-2 ${ cartItems.some(i => i.id === data._id)? "bg-gray-800": "bg-[#ff4d2d]"} text-white`}
            onClick={() =>quantity > 0 && dispatch(
                addToCart({
                  id: data._id,
                  name: data.name,
                  price: data.price,
                  image: data.image,
                  shop: data.shop,
                  quantity
                })
              )
            }
          >
            <TiShoppingCart size={15} />
          </button> 
        </div>
      </div>  
    </div>
  )
}

export default FoodCard



// import React, { useState } from 'react'
// import { FaStar, FaRegStar, FaMinus, FaPlus } from "react-icons/fa"
// import { TiShoppingCart } from "react-icons/ti"
// import { useDispatch } from 'react-redux'
// import { addToCart } from '../redux/userSlice'
// import { useNavigate } from 'react-router-dom'

// function FoodCard({ data }) {
//   const [quantity, setQuantity] = useState(0)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const canOrder = data.allowOrder === true
//   const canBook = data.allowBooking === true

//   const renderStars = (rating) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         i <= rating
//           ? <FaStar key={i} className="text-yellow-500 text-sm" />
//           : <FaRegStar key={i} className="text-yellow-500 text-sm" />
//       )
//     }
//     return stars
//   }

//   return (
//     <div className="w-[210px] rounded-xl border border-[#ff4d2d] bg-white shadow-sm flex flex-col">

//       <div className="h-[120px] w-full overflow-hidden rounded-t-xl">
//         <img
//           src={data.image}
//           alt={data.name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-3 flex flex-col gap-1 flex-1">
//         <h1 className="font-semibold text-gray-900 text-sm truncate">
//           {data.name}
//         </h1>

//         <div className="flex items-center gap-1">
//           {renderStars(data.rating?.average || 0)}
//           <span className="text-xs text-gray-500">
//             ({data.rating?.count || 0})
//           </span>
//         </div>
//       </div>

//       {/* ===== ACTION AREA ===== */}
//       <div className="px-3 pb-3 flex flex-col gap-2">

//         {/* ORDER ONLY */}
//         {canOrder && (
//           <div className="flex items-center justify-between">
//             <span className="font-bold text-gray-900">₹{data.price}</span>

//             <div className="flex items-center border rounded-full overflow-hidden">
//               <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
//                 <FaMinus size={10} />
//               </button>

//               <span className="px-2 text-sm">{quantity}</span>

//               <button onClick={() => setQuantity(quantity + 1)}>
//                 <FaPlus size={10} />
//               </button>

//               <button
//                 className="bg-[#ff4d2d] text-white px-3"
//                 onClick={() =>
//                   quantity > 0 &&
//                   dispatch(addToCart({
//                     id: data._id,
//                     name: data.name,
//                     price: data.price,
//                     image: data.image,
//                     shop: data.shop,
//                     quantity
//                   }))
//                 }
//               >
//                 <TiShoppingCart size={15} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* BOOKING ONLY */}
//         {!canOrder && canBook && (
//           <>
//             <span className="font-bold text-gray-900">₹{data.price}</span>
//             <button
//               className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold"
//               onClick={() => navigate(`/book/${data._id}`)}
//             >
//               Book Now
//             </button>
//           </>
//         )}

//         {/* INFO ONLY */}
//         {!canOrder && !canBook && (
//           <p className="text-xs text-gray-500 italic">
//             Available in store
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default FoodCard





// import React, {useState} from 'react'
// import { FaStar } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
// import { FaMinus } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";
// import { TiShoppingCart } from "react-icons/ti";
// import { useDispatch,useSelector } from 'react-redux'
// import { addToCart } from '../redux/userSlice'


// function FoodCard({ data }) {
//   const [quantity, setQuantity] = useState(0)
//   const dispatch = useDispatch()
//   const { cartItems } = useSelector(state => state.user)

//   const canOrder = data.allowOrder === true
//   const canBook = data.allowBooking === true

//   const renderStars=(rating)=>{
//         const stars=[];
//         for(let i=1; i<=5; i++){
//             stars.push(
//                (i<=rating)?(<FaStar className='text-yellow-500 text-lg'/>):(<FaRegStar className='text-yellow-500 text-lg'/>)
//             )
//         }
//         return stars
//     }

//   return (
//     <div className="w-[210px]  rounded-xl border border-[#ff4d2d] bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
//       <div className="h-[120px] w-full overflow-hidden rounded-t-xl">
//         <img src={data.image} alt={data.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
//       </div>

//       <div className="p-3 flex flex-col gap-1 flex-1">
//         <h1 className="font-semibold text-gray-900 text-sm truncate">
//           {data.name}
//         </h1>

//         <div className="flex items-center gap-1">{renderStars(data.rating?.average || 0)}
//           <span className="text-xs text-gray-500">({data.rating?.count || 0})</span>
//         </div>
//       </div>
      
//       <div className="px-3 pb-3 flex items-center justify-between">
//         <span className="font-bold text-gray-900 text-base">₹{data.price}</span>
//         <div className="flex items-center border rounded-full overflow-hidden">
//           <button className="px-2 py-1 hover:bg-gray-100" onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
//             <FaMinus size={10} />
//           </button>

//           <span className="px-2 text-sm">{quantity}</span>

//           <button className="px-2 py-1 hover:bg-gray-100" onClick={() => setQuantity(quantity + 1)}>
//             <FaPlus size={10} />
//           </button>

//           <button className={`px-3 py-2 ${ cartItems.some(i => i.id === data._id)? "bg-gray-800": "bg-[#ff4d2d]"} text-white`}
//             onClick={() =>quantity > 0 && dispatch(
//                 addToCart({
//                   id: data._id,
//                   name: data.name,
//                   price: data.price,
//                   image: data.image,
//                   shop: data.shop,
//                   quantity
//                 })
//               )
//             }
//           >
//             <TiShoppingCart size={15} />
//           </button> 
//         </div>
//       </div>  
//     </div>
//   )
// }

// export default FoodCard