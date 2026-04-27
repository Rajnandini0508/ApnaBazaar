import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    name: { type: String, required: true },
    phoneno: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paymentMode: { type: String, enum: ["COD", "Online"], default: "COD" },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: "Pending" },
    razorpayOrderId: String
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
