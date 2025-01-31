import { useState , useEffect } from "react";
import axios from "axios";

const UpdateRestaurantInfo = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [resturantId, setResturantId] = useState();
  const id = localStorage.getItem("Role").split("-")[1];

  useEffect(() => {
    fetchRestaurantInfo();
  }, []);

  const fetchRestaurantInfo = async () => {
    console.log(id);

    try {
      const response1 = await axios.post("http://localhost:3000/GetRestaurantByManagerId", {
        ManagerId: id,
      });
      console.log(response1);

      const data = response1.data;
      setName(data.RestaurantName);
      setAddress(data.RestaurantAddress);
      setCity(data.RestaurantCity);
      setMinOrder(data.RestaurantLimitBuy);
      setDeliveryFee(data.RestaurantDeliveryFee);
      setProfileImage(data.profileImage || "");
      setResturantId(data.RestaurantId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    console.log("Sending Data:", {
      id: resturantId,
      managerId: id,
      name: name,
      address: address,
      city: city,
      limitBuy: minOrder,
      deliveryFee: deliveryFee,
      profilePicture: profileImage,
    });

    try {
      const response = await axios.post("http://localhost:3000/UpdateRestaurant", {
        id: resturantId,
        managerId: id,
        name: name,
        address: address,
        city: city,
        limitBuy: minOrder,
        deliveryFee: deliveryFee,
        profilePicture: profileImage || "",
      });
      console.log("Response:", response);
      fetchRestaurantInfo();
    } catch (err) {
      console.log("Error:", err.response ? err.response.data : err);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">آپدیت اطلاعات رستوران</h2>

      <div className="space-y-3">
        <label htmlFor="restaurantName" className="block font-medium">
          نام رستوران
        </label>
        <input
          id="restaurantName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام رستوران"
          className="border p-2 w-full rounded"
        />

        <label htmlFor="address" className="block font-medium">
          آدرس
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="آدرس"
          className="border p-2 w-full rounded"
        />

        <label htmlFor="city" className="block font-medium">
          شهر
        </label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="شهر"
          className="border p-2 w-full rounded"
        />

        <label htmlFor="minOrder" className="block font-medium">
          حداقل خرید
        </label>
        <input
          id="minOrder"
          type="number"
          value={minOrder}
          onChange={(e) => setMinOrder(e.target.value)}
          placeholder="حداقل خرید"
          className="border p-2 w-full rounded"
        />

        <label htmlFor="deliveryFee" className="block font-medium">
          هزینه پیک
        </label>
        <input
          id="deliveryFee"
          type="text"
          value={deliveryFee}
          onChange={(e) => setDeliveryFee(e.target.value)}
          placeholder="هزینه پیک"
          className="border p-2 w-full rounded"
        />

        <label htmlFor="profileImage" className="block font-medium">
          لینک عکس پروفایل
        </label>
        <input
          id="profileImage"
          type="text"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          placeholder="لینک عکس پروفایل"
          className="border p-2 w-full rounded"
        />

        <button 
          onClick={handleUpdate} 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
};

export default UpdateRestaurantInfo;
