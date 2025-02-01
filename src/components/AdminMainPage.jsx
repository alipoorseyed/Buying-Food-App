import { useState } from "react";
import ManageCustomers from "./ManageCustomers";
import ManageManagers from "./ManageManagers";
import ManageRestaurants from "./ManageRestaurants";

const AdminMainPage = () => {
  const [section, setSection] = useState("Customers");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-pink-800 mb-6 text-center">
        مدیریت سیستم
      </h1>

      {/* دکمه‌های ناوبری */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSection("Customers")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            section === "Customers" ? "bg-pink-700 text-white" : "bg-gray-200"
          }`}
        >
          مدیریت مشتریان
        </button>
        <button
          onClick={() => setSection("Managers")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            section === "Managers" ? "bg-pink-700 text-white" : "bg-gray-200"
          }`}
        >
          مدیریت مدیران
        </button>
        <button
          onClick={() => setSection("Restaurants")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            section === "Restaurants" ? "bg-pink-700 text-white" : "bg-gray-200"
          }`}
        >
          مدیریت رستوران‌ها
        </button>
      </div>

      {/* نمایش کامپوننت مربوطه */}
      {section === "Customers" && <ManageCustomers />}
      {section === "Managers" && <ManageManagers />}
      {section === "Restaurants" && <ManageRestaurants />}
    </div>
  );
};

export default AdminMainPage;
