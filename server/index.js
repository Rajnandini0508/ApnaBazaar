import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import shopRouter from "./routes/shop.routes.js"
import itemRouter from "./routes/item.routes.js"
import orderRouter from "./routes/order.routes.js"
import bookingRouter from "./routes/booking.routes.js"
import cors from "cors"
import http from 'http'
import { Server } from "socket.io"
import { socketHandler } from './socket.js'

const app = express()
const server = http.createServer(app)

const allowedOrigins = [
    "https://apna-bazaar-7i22.vercel.app",
    "https://apna-bazaar-mu.vercel.app",
    "https://rajnandini0508.github.io",
    "http://localhost:5173",
    "http://localhost:5174"
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
        methods: ['POST', 'GET']
    }
})

app.set("io", io)

const port = process.env.PORT || 5000

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)
app.use("/api/booking", bookingRouter)

socketHandler(io)
server.listen(port, () => {
    connectDb();
    console.log(`server started at ${port}`)
})
