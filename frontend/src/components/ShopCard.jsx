import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";

function ShopCard({ shop }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        w-[220px]
        rounded-xl
        border border-[#ff4d2d]
        bg-white
        shadow-sm
        hover:shadow-lg
        transition-all duration-300
        cursor-pointer
        flex flex-col
      "
      onClick={() => navigate(`/shop/${shop._id}`)}
    >
      {/* Image */}
      <div className="h-[120px] w-full overflow-hidden rounded-t-xl bg-gray-100">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h2 className="font-semibold text-gray-900 text-sm truncate">
          {shop.name}
        </h2>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FaStore className="text-[#ff4d2d]" />
          <span>{shop.city}</span>
        </div>

        <p className="text-xs text-gray-500 truncate">
          {shop.address}
        </p>
      </div>

      {/* Button */}
      <div className="px-3 pb-3">
        <button className="w-full bg-[#ff4d2d] text-white text-sm py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
          View Shop
        </button>
      </div>
    </div>
  );
}

export default ShopCard;
