import Booking from "../models/booking.model.js";
import Razorpay from "razorpay";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const placeBooking = async (req, res) => {
    try {
        const { shopId, itemId, name, phoneno, date, time, address, paymentMode, totalAmount } = req.body;
        const userId = req.userId;

        const newBooking = new Booking({
            user: userId, shop: shopId, item: itemId,
            name, phoneno, date, time, address, paymentMode, totalAmount
        });

        if (paymentMode === "Online") {
            const options = {
                amount: totalAmount * 100,
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            };
            const razorOrder = await razorpay.orders.create(options);
            newBooking.razorpayOrderId = razorOrder.id;
            await newBooking.save();
            return res.status(200).json({ bookingId: newBooking._id, razorOrder });
        }

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: "Error placing booking" });
    }
};

export const verifyBookingPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        booking.paymentStatus = "Paid";
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Payment verification failed" });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const role = user.role;

        let bookings;
        if (role === "seller") {
            const shop = await Shop.findOne({ seller: userId });
            if (!shop) return res.status(200).json([]);
            bookings = await Booking.find({ shop: shop._id }).populate("item").populate("user").sort({ createdAt: -1 });
        } else {
            bookings = await Booking.find({ user: userId }).populate("shop").populate("item").sort({ createdAt: -1 });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        const io = req.app.get("io");
        io.to(booking.user.toString()).emit("booking-update", { bookingId, status });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error updating status" });
    }
};
