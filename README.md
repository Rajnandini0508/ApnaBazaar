# ApnaBazaar - Local Marketplace Platform 🛒

ApnaBazaar is a modern, full-stack marketplace application that bridges the gap between local shop owners, customers, and delivery partners. Built with the **MERN Stack**, it features real-time tracking, secure payments, and a role-based dashboard system.

---

## 🔗 Live Demo
**[Visit ApnaBazaar Live](https://apna-bazaar-mu.vercel.app)**

---

## ✨ Features

### 👤 For Customers
- **Location-based Discovery**: Find shops and products in your specific city.
- **Real-time Tracking**: Watch your order status update live via WebSockets.
- **Smart Cart**: Seamless shopping experience with persistent cart management.
- **Secure Auth**: Login via Email/Password or Google Authentication.

### 🏪 For Sellers
- **Store Management**: Create your shop profile and manage your branding.
- **Inventory Control**: Full CRUD operations for products with image uploads.
- **Order Dashboard**: Manage incoming orders and assign them to delivery partners.

### 🚴 For Delivery Partners
- **Assignment System**: View and accept available delivery tasks in your area.
- **Status Updates**: Mark orders as delivered to complete the workflow.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Redux Toolkit (State Management)
- Tailwind CSS (Styling)
- Socket.io-client (Real-time updates)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JWT & Firebase (Authentication)
- Cloudinary (Image Hosting)

---

## ⚙️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rajnandini0508/ApnaBazaar.git
   cd ApnaBazaar
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   # Create a .env file with MONGODB_URI, JWT_SECRET, etc.
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   # Create a .env file with VITE_FIREBASE_APIKEY, etc.
   npm run dev
   ```

---

## 🛡️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files:

**Server:** `MONGODB_URI`, `JWT_SECRET`, `EMAIL`, `PASS`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_NAME`, `CLOUDINARY_API_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

**Frontend:** `VITE_FIREBASE_APIKEY`, `VITE_GEOAPIKEY`, `VITE_RAZORPAY_KEY_ID`

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
