import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import sellerSlice from "./sellerSlice"
import mapSlice from "./mapSlice"
import bookingSlice from "./bookingSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    seller: sellerSlice,
    map: mapSlice,
    booking: bookingSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/setSocket"],
        ignoredPaths: ["user.socket"],
      },
    }),
})