import uploadOnCloudinary from "../utils/cloudinary.js"
import Shop from "../models/shop.model.js"

export const createEditShop=async (req,res) => {
    try {
        const {name,city,state,address,phoneno,category}=req.body
         
        if (!req.userId) {  //added
            return res.status(401).json({ message: "Unauthorized" })
        }
        let image;
        if(req.file){
            image= await uploadOnCloudinary(req.file.path);  
        }
        let shop=await Shop.findOne({seller:req.userId})
        if(!shop){
            shop=await Shop.create({
            name,city,state,address,category,phoneno,image,seller:req.userId
        })
        } 
        // else {
        //     shop=await Shop.findByIdAndUpdate(shop._id,{
        //         name,city,state,address,image,seller:req.userId
        //     },{new:true})
        // }

        else {
      // EDIT (do NOT overwrite image if not uploaded)
      shop.name = name
      shop.city = city
      shop.state = state
      shop.address = address
      shop.category = category
      shop.phoneno = phoneno

      if (image) {
        shop.image = image
      }

      await shop.save()
    }

        await shop.populate("seller items")
        return res.status(201).json(shop)
    } catch (error) {
        return res.status(500).json({message:`create shop error ${error}`})
    }
}


export const getMyShop=async (req,res) =>{
    try {
        const shop=await Shop.findOne({seller:req.userId}).populate("seller").populate({
            path:"items",
            options:{sort:{updatedAt:-1}}
        })
        
        if(!shop){
            // return null
            return res.status(404).json({ message: "Shop not found" })
        }
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({message:`get my shop error ${error}`})
    }
}



export const getShopByCity=async (req,res)=>{
    try {
        const {city}=req.params
        const shops=await Shop.find({
            city:{$regex:new RegExp(`^${city}$`,"i")}
        }).populate('items')
        if(!shops){
            return res.status(400).json({message:"shop not found"})
        }
        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({message:`get shop by city error ${error}`})
    }
}