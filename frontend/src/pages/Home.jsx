import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import SellerDashboard from "../components/SellerDashboard";
import DeliveryBoy from "../components/DeliveryBoy";

function Home() {
  const { userData } = useSelector((state)=>state.user);

  return (
    <div className="w-[100w] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]">
        {userData.role === "user" && <UserDashboard />}
        {userData.role === "seller" && <SellerDashboard />}
        {userData.role === "deliveryBoy" && <DeliveryBoy />}
    </div>
  )
}

export default Home;