import mongoose from 'mongoose'

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    category:{
        type:String,
        enum:[  "Vegetable",
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
                "Others"
            ],
            required:true
    },
    price:{
        type:Number,
        min:0,
        required:false,
        default:0
    },
    rating:{
        average:{type:Number,default:0},
        count:{type:Number,default:0}
    }

},{timestamps:true})

const Item=mongoose.model("Item",itemSchema)
export default Item


