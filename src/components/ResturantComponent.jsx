import fastfoodIcon from "../assets/FastFood.png";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ResturantComponent = ({ name, deliveryFee, address, imagesrc, ResturantId }) => {
  const navigate = useNavigate();

  // بررسی مقدار null یا undefined و جایگزین کردن مقدار پیش‌فرض
  // eslint-disable-next-line react/prop-types
  const finalImg = typeof imagesrc === "string" && imagesrc.trim() ? imagesrc : fastfoodIcon;


  return (
    <div className="flex flex-col items-center p-4 bg-pink-100 rounded-2xl shadow-md w-72 hover:shadow-lg transition">
      {/* Restaurant Image */}
      <img 
        src={finalImg} 
        alt={name} 
        className="w-32 h-32 object-cover rounded-full border-4 border-pink-300"
      />

      {/* Restaurant Info */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-pink-700">{name}</p>
        <p className="text-sm text-gray-600 mt-1">{address}</p>
        <p className="text-md text-pink-500 mt-2 font-medium">
          هزینه پیک : {deliveryFee} تومان
        </p>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => navigate(`/SelectedResturantPage/${ResturantId}`)} 
        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
      >
        مشاهده رستوران
      </button>
    </div>
  );
};

export default ResturantComponent;
