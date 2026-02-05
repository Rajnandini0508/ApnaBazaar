import Shop from "../models/shop.model.js"
import Item from "../models/item.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"


export const addItem=async (req,res) => {
    try {
        const {name,category,price}=req.body

        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)   //add
         }
        const shop=await Shop.findOne({seller:req.userId})
        if(!shop){
            return res.status(400).json({message:"shop not found"})
        }
        const item=await Item.create({
            name,category,price,image,shop:shop._id
        })

        shop.items.push(item._id)
        await shop.save()
        await shop.populate("seller")
        await shop.populate({
             path:"items",
            options:{sort:{updatedAt:-1}}
        })

        return res.status(201).json(shop)
    } catch (error) {
        return res.status(500).json({message:`add item error ${error}`})
    }
}


export const editItem=async (req,res) => {
    try {
        const itemId=req.params.itemId
        const {name,category,price}=req.body
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        const item=await Item.findByIdAndUpdate(itemId, {
            name,category,price,image
        }, {new:true})
        if(!item) {
            return res.status(400).json({message:"item not found"})
        }
        const shop=await Shop.findOne({seller:req.userId})
           
        return res.status(200).json(item)

    } catch (error) {
        return res.status(500).json({message:`edit item error ${error}`})
    }
}

export const getItemById=async (req,res) => {
    try {
        const itemId=req.params.item
        const item=await Item.findById(itemId)
        if(!item){
            return res.status(400).json({message:"item not found"})
        }
        // const shop=await Shop.findOne({seller:req.userId}).populate("item")
        return res.status(200).json(item)
    } catch (error) {
        return res.status(500).json({message:`get item error ${error}`})
    }
}

export const deleteItem=async (req,res)=> {
    try {
        const itemId=req.params.itemId
        const item=await Item.findByIdAndDelete(itemId)
        if(!item) {
            return res.status(400).json({message:"item not found"})
        }
        const shop=await Shop.findOne({seller:req.userId})
        shop.items=shop.items.filter(i=>i!==item._id)
        await shop.save()
        await shop.populate({
            path:"items",
            options:{sort:{updatedAt:-1}}
        })
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({message:`get item error ${error}`})
    }
}

export const getItemByCity=async(req,res)=> {
    try {
        const {city}=req.params
        if(!city){
            return res.status(400).json({message:"city is required"})
        }
        const shops=await Shop.find({
            city:{$regex:new RegExp(`^${city}$`,"i")}
        }).populate('items')
        if(!shops){
            return res.status(400).json({message:"shop not found"})
        }
        const shopIds=shops.map((shop)=>shop._id)
        const items=await Item.find({shop:{$in:shopIds}})
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({message:`get item by city error ${error}`})
    }
}

export const getItemsByShop=async(req,res)=> {
    try {
        const {shopId}=req.params
        const shop= await Shop.findById(shopId).populate("items")
        if(!shop){
            return res.status(400).json({message:"shop not found"})
        }
        return res.status(200).json({
            shop,items:shop.items
        })
    } catch (error) {
        return res.status(500).json({message:`get item by shop error ${error}`})
    }
}

export const searchItems=async(req,res)=> {
    try {
        const {query,city}=req.query
        if(!query || !city){
            return null
        }
        const shops=await Shop.find({
            city:{$regex:new RegExp(`^${city}$`,"i")}
        }).populate('items')
        if(!shops){
            return res.status(400).json({message:"shop not found"})
        }
        const shopIds=shops.map(s=>s._id)
        const items=await Item.find({
            shop:{$in:shopIds},
            $or:[
                {name:{$regex:query,$options:"i"}},
                {category:{$regex:query,$options:"i"}}
            ]   
        }).populate("shop","name image")

        return res.status(200).json(items)

    } catch (error) {
        return res.status(500).json({message:`get search items error ${error}`})
    }
}

export const rating=async (req,res)=> {
    try {
       const {itemId,rating}=req.body

       if(!itemId || !rating){
        return res.status(400).json({message:"itemId and rating is required"})
       } 

       if(rating<1 || rating>5){
        return res.status(400).json({message:"rating must be between 1 to 5"})
       }

       const item=await Item.findById(itemId)
       if(!item){
        return res.status(400).json({message:"item not found"})
       }

       const newCount=item.rating.count + 1
       const newAverage=(item.rating.average*item.rating.count + rating)/newCount

       item.rating.count=newCount
       item.rating.average=newAverage
       await item.save()

       return res.status(200).json({rating:item.rating})
    } catch (error) {
        return res.status(500).json({message:`rating error ${error}`})
    }
}


















// import Shop from "../models/shop.model.js"
// import Item from "../models/item.model.js"
// import uploadOnCloudinary from "../utils/cloudinary.js"

// export const addItem = async (req, res) => {
//   try {
//     console.log("👉 ADD ITEM HIT");

//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const { name, category, price } = req.body;

//     if (!name || !category || !price) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const shop = await Shop.findOne({ seller: req.userId });
//     if (!shop) {
//       return res.status(400).json({ message: "shop not found" });
//     }

//     let image;
//     if (req.file?.path) {
//       const uploaded = await uploadOnCloudinary(req.file.path);
//       if (!uploaded) {
//         return res.status(400).json({ message: "Image upload failed" });
//       }
//       image = uploaded.secure_url;
//     } else {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     const item = await Item.create({
//       name,
//       category,
//       price,
//       image,
//       shop: shop._id,
//     });

//     shop.items.push(item._id);
//     await shop.save();

//     await shop.populate({
//       path: "items",
//       options: { sort: { updatedAt: -1 } },
//     });

//     return res.status(201).json(shop);

//   } catch (error) {
//     console.error("ADD ITEM ERROR:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const editItem = async (req, res) => {
//   try {
//     const { itemId } = req.params;
//     const { name, category, price } = req.body;

//     let updateData = { name, category, price };

//     if (req.file?.path) {
//       const uploaded = await uploadOnCloudinary(req.file.path);
//       if (uploaded) {
//         updateData.image = uploaded.secure_url;
//       }
//     }

//     const item = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
//     if (!item) {
//       return res.status(400).json({ message: "item not found" });
//     }

//     const shop = await Shop.findOne({ seller: req.userId }).populate({
//       path: "items",
//       options: { sort: { updatedAt: -1 } },
//     });

//     return res.status(200).json(shop);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const getItemById = async (req, res) => {
//   try {
//     const { itemId } = req.params;

//     const item = await Item.findById(itemId);
//     if (!item) {
//       return res.status(400).json({ message: "item not found" });
//     }

//     return res.status(200).json(item);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const deleteItem = async (req, res) => {
//   try {
//     const { itemId } = req.params;

//     const item = await Item.findByIdAndDelete(itemId);
//     if (!item) {
//       return res.status(400).json({ message: "item not found" });
//     }

//     const shop = await Shop.findOne({ seller: req.userId });
//     shop.items = shop.items.filter(
//       (i) => i.toString() !== item._id.toString()
//     );

//     await shop.save();
//     await shop.populate({
//       path: "items",
//       options: { sort: { updatedAt: -1 } },
//     });

//     return res.status(200).json(shop);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


// export const getItemByCity = async (req, res) => {
//   try {
//     const { city } = req.params;

//     if (!city) {
//       return res.status(400).json({ message: "city is required" });
//     }

//     const shops = await Shop.find({
//       city: { $regex: new RegExp(`^${city}$`, "i") },
//     }).populate("items");

//     if (!shops || shops.length === 0) {
//       return res.status(200).json([]);
//     }

//     const shopIds = shops.map((shop) => shop._id);
//     const items = await Item.find({ shop: { $in: shopIds } });

//     return res.status(200).json(items);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
