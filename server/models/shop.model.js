import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ["Order", "Booking", "Display"],
        default: "Order"
    },
    category: {
        type: String,
        required: false
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
}, { timestamps: true })

const Shop = mongoose.model("Shop", shopSchema)
export default Shop