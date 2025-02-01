import { useState, useEffect } from "react";
import axios from "axios";

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    ManagerId: "",
    RestaurantName: "",
    RestaurantAddress: "",
    RestaurantCity: "",
    RestaurantLimitBuy: "",
    RestaurantDeliveryFee: "",
    RestaurantProfilePicture: "",
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/AllRestaurants");
      console.log(res.data);
      
      setRestaurants(res.data);
    } catch (error) {
      console.error("خطا در دریافت لیست رستوران‌ها:", error);
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      await axios.post("http://localhost:3000/DeleteRestaurant", { id });
      fetchRestaurants();
    } catch (error) {
      console.error("خطا در حذف رستوران:", error);
    }
  };

  const addRestaurant = async () => {
    try {
      await axios.post("http://localhost:3000/AddRestaurant", 
        {
            managerId : newRestaurant.ManagerId,
            name : newRestaurant.RestaurantName,
            address : newRestaurant.RestaurantAddress,
            city : newRestaurant.RestaurantCity,
            limitBuy : newRestaurant.RestaurantLimitBuy,
            deliveryFee : newRestaurant.RestaurantDeliveryFee,
            profilePicture : newRestaurant.RestaurantProfilePicture
        }
      );
      fetchRestaurants();
      setNewRestaurant({
        ManagerId: "",
        RestaurantName: "",
        RestaurantAddress: "",
        RestaurantCity: "",
        RestaurantLimitBuy: "",
        RestaurantDeliveryFee: "",
        RestaurantProfilePicture: "",
      });
    } catch (error) {
      console.error("خطا در افزودن رستوران:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-pink-700 mb-4">لیست رستوران‌ها</h2>
      <ul>
        {restaurants.map((r) => (
          <li key={r.RestaurantId} className="flex justify-between p-3 border-b">
            <div>
              <strong>{r.RestaurantName}</strong> - {r.RestaurantCity}
            </div>
            <button
              onClick={() => deleteRestaurant(r.RestaurantId)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>

      {/* افزودن رستوران جدید */}
      <h3 className="text-lg font-bold mt-4">افزودن رستوران</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <input
          type="text"
          placeholder="Manager ID"
          value={newRestaurant.ManagerId}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, ManagerId: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="نام رستوران"
          value={newRestaurant.RestaurantName}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, RestaurantName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="آدرس رستوران"
          value={newRestaurant.RestaurantAddress}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, RestaurantAddress: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="شهر"
          value={newRestaurant.RestaurantCity}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, RestaurantCity: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="حداقل تعداد خرید"
          value={newRestaurant.RestaurantLimitBuy}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, RestaurantLimitBuy: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="هزینه ارسال (تومان)"
          value={newRestaurant.RestaurantDeliveryFee}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, RestaurantDeliveryFee: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="لینک عکس پروفایل"
          value={newRestaurant.RestaurantProfilePicture}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, RestaurantProfilePicture: e.target.value })}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={addRestaurant}
        className="bg-green-500 text-white px-3 py-2 rounded mt-3 w-full"
      >
        افزودن رستوران
      </button>
    </div>
  );
};

export default ManageRestaurants;
