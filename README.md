🛒 ApnaBazaar
ApnaBazaar is a full-stack MERN (MongoDB, Express, React, Node.js) based local marketplace application that connects users, sellers, and delivery partners on a single platform.
It allows users to order items from nearby shops, sellers to manage orders, and delivery boys to handle deliveries efficiently.

🚀 Features
👤 User
Register & Login
Browse shops by city
View items from nearby shops
Add items to cart
Place orders (COD / Online)
Track order status in real time
View order history
Auto location detection

🏪 Seller
Create & manage shop
Add / update / delete items
View orders from users
Update order status (Pending → Shipping → Out for Delivery → Delivered)
Assign orders to delivery partners

🚴 Delivery Boy
View available delivery assignments
Accept delivery orders
View current delivery
Mark order as completed

🛠️ Tech Stack
Frontend

React.js
Redux Toolkit
Axios
React Router
Tailwind CSS / CSS

Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Socket.io (for real-time updates)

Other Tools
Cloudinary (image upload)
Multer
Git & GitHub

⚙️ Environment Variables
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

How to Run Locally
git clone https://github.com/Rajnandini0508/ApnaBazaar.git
cd ApnaBazaar

Backend-
cd server
npm install
npm run dev

Frontend-
cd client
npm install
npm run dev
