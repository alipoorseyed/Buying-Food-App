import { useState } from "react";
import Pizza from "../assets/Pizza.png";

// eslint-disable-next-line react/prop-types
const ResturantItem = ({ id, price, name, imagesrc, updateSelectedItems }) => {
  const [count, setCount] = useState(0);

  const handlePlus = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateSelectedItems(id, newCount , name);
  };

  const handleMinus = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateSelectedItems(id, newCount , name);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start w-80 gap-5 p-6 bg-pink-50 rounded-xl shadow-lg transition-all hover:shadow-xl">
      <img
        className="w-full h-52 rounded-3xl object-center"
        src={imagesrc || Pizza}
        alt={name}
      />
      <div className="flex flex-col justify-start items-start gap-4 mt-4">
        <p className="text-xl font-semibold text-pink-700">{name}</p>
        <p className="text-lg">{price} تومان</p>
      </div>
      <div className="flex justify-start items-center gap-4 mt-4">
        <button
          onClick={handleMinus}
          className="bg-pink-300 text-white py-2 px-4 rounded-full hover:bg-pink-400 transition"
        >
          -
        </button>
        <p className="text-lg font-medium">{count}</p>
        <button
          onClick={handlePlus}
          className="bg-pink-300 text-white py-2 px-4 rounded-full hover:bg-pink-400 transition"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ResturantItem;
