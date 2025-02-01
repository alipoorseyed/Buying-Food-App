import { useState, useEffect } from "react";
import axios from "axios";

const CustomerPersonal = () => {
  const [orders, setOrders] = useState([]);
  const id = localStorage.getItem("Role").split("-")[1];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/GetCustomerOrderHistory",
        { id }
      );

      console.log("داده‌های دریافتی:", response.data);

      const groupedOrders = groupOrdersById(response.data);
      setOrders(groupedOrders);
    } catch (err) {
      console.error("خطا در دریافت داده‌ها:", err);
    }
  };

  const groupOrdersById = (orders) => {
    const grouped = {};

    orders.forEach((order) => {
      if (!grouped[order.OrderId]) {
        grouped[order.OrderId] = {
          OrderId: order.OrderId,
          RestaurantId: order.RestaurantId,
          RestaurantName: order.RestaurantName,
          AddressId: order.AddressId,
          OrderExplanation: order.OrderExplation,
          OrderDate: order.OrderDate, // اضافه شدن تاریخ سفارش
          items: [],
          itemNumber: 0,
        };
      }

      grouped[order.OrderId].items.push({
        name: order.ItemName,
        quantity: order.Quantity,
      });

      grouped[order.OrderId].itemNumber += order.Quantity;
    });

    return Object.values(grouped);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-4xl font-extrabold text-pink-800 mb-6">تاریخچه خریدهای شما</h1>
      <div className="w-full max-w-2xl">
        {orders.length === 0 ? (
          <p className="text-gray-700 text-lg text-center bg-white p-4 rounded-lg shadow-md">
            شما خریدی انجام نداده‌اید.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.OrderId}
              className="p-6 mb-6 bg-white border-l-4 border-pink-500 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-bold text-pink-700">{order.RestaurantName}</h2>
              <p className="text-gray-500 mt-1 text-sm">📅 تاریخ سفارش: {new Date(order.OrderDate).toLocaleDateString("fa-IR")}</p>
              <p className="text-gray-600 mt-1 text-sm">📝 توضیحات: {order.OrderExplanation}</p>
              <p className="text-gray-800 font-semibold mt-2">📦 تعداد کل آیتم‌ها: {order.itemNumber}</p>

              <ul className="mt-4 space-y-2">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-pink-100 px-4 py-2 rounded-md text-pink-700 font-medium shadow-sm"
                  >
                    <span>{item.name}</span>
                    <span>{item.quantity} عدد</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerPersonal;
