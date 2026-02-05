import React from "react";

function CategoryCard({ name, image,onClick }) {
  return (
    <div
      className="
        min-w-[120px] md:min-w-[150px]
        h-[140px]
        bg-white
        rounded-2xl
        flex flex-col items-center justify-center
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
        group
      "
    >
      {/* Icon container */}
      <div
        className="
          w-16 h-16 md:w-20 md:h-20
          rounded-full
          bg-[#fff2ec]
          flex items-center justify-center
          mb-2
          group-hover:scale-110
          transition-transform duration-300" onClick={onClick}>
        <img
          src={image}
          alt={name}
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />
      </div>

      {/* Category name */}
      <p className="text-sm font-semibold text-gray-700 group-hover:text-[#ff4d2d] transition">
        {name}
      </p>
    </div>
  );
}

export default CategoryCard;





