import express from "express";
import { placeBooking, verifyBookingPayment, getMyBookings, updateBookingStatus } from "../controllers/booking.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/place-booking", isAuth, placeBooking);
router.post("/verify-payment", isAuth, verifyBookingPayment);
router.get("/my-bookings", isAuth, getMyBookings);
router.post("/update-status/:bookingId", isAuth, updateBookingStatus);

export default router;
