
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import axios from 'axios'
import { serverUrl } from '../App'
import ClipLoader from "react-spinners/ClipLoader";
import { setMyShopData } from '../redux/sellerSlice'

function EditItem() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { itemId } = useParams()

  const [currentItem, setCurrentItem] = useState(null)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("")
  const [frontendImage, setFrontendImage] = useState("")
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const categories = [
    "Vegetable","Footwear","Grocery","Stationery","Bakery",
    "Pharmacy","Electronic","Cafe","Fashion",
    "Cosmetics","Generalstore","Tailor","Salon","Others"
  ]

  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("category", category)

      if (backendImage) {
        formData.append("image", backendImage)
      }

      const result = await axios.post(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formData,
        { withCredentials: true }
      )

      dispatch(setMyShopData(result.data))
      navigate("/")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/item/get-by-id/${itemId}`,
          { withCredentials: true }
        )
        setCurrentItem(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchItem()
  }, [itemId])

  useEffect(() => {
    if (!currentItem) return;

    setName(currentItem.name || "")
    setPrice(currentItem.price || 0)
    setCategory(currentItem.category || "")
    setFrontendImage(currentItem.image || "")
  }, [currentItem])

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      <div className="absolute top-4 left-4 cursor-pointer" onClick={() => navigate("/")}>
        <IoIosArrowRoundBack size={32} className="text-[#ff4d2d]" />
      </div>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-3">
            <GiShoppingBag className="text-[#ff4d2d]" size={48} />
          </div>
          <h2 className="text-2xl font-bold">Edit Item</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Item name"
            required
          />

          <input className="w-full border px-4 py-2 rounded"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Price"
            required
          />

          <select className="w-full border px-4 py-2 rounded"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input type="file" accept="image/*" onChange={handleImage} />

          {frontendImage && (
            <img src={frontendImage} className="h-40 w-full object-cover rounded" />
          )}

          <button disabled={loading}
            className="w-full bg-[#ff4d2d] text-white py-3 rounded font-semibold">
            {loading ? <ClipLoader size={20} color="white" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditItem
