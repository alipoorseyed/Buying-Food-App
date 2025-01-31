import { useState, useEffect } from "react";
import axios from "axios";

const UpdateCategory = () => {
  const [categories, setCategories] = useState([]); // لیست کتگوری‌ها
  const [newCategory, setNewCategory] = useState(""); // کتگوری جدید

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/GetAllCategories");
      console.log("Categories Response:", response.data);
      setCategories(response.data); // لیست کتگوری‌ها را از سرور می‌گیریم
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const addCategory = async () => {
    if (categories.includes(newCategory)) {
      alert("این کتگوری وجود دارد .");
      return; // اگر کتگوری جدید تکراری باشد، اجازه اضافه کردن نمی‌دهیم
    }

    try {
      await axios.post("http://localhost:3000/AddCategory", {
        Category: newCategory,
      });
      setNewCategory(""); // فیلد تکست را خالی می‌کنیم
      fetchCategories(); // لیست کتگوری‌ها را دوباره بارگذاری می‌کنیم
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  useEffect(() => {
    fetchCategories(); // بارگذاری کتگوری‌ها هنگام بارگذاری کامپوننت
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">بروزرسانی کتگوری‌ها</h2>

      <div className="mb-4">
        <h3 className="text-md font-semibold">کتگوری‌های موجود:</h3>
        {categories.length === 0 ? (
          <div>هیچ کتگوری موجود نیست</div>
        ) : (
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="border p-2 rounded mb-2">
                {category.Category}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="نام کتگوری جدید"
          className="border p-2 rounded ml-2"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          اضافه کردن کتگوری
        </button>
      </div>
    </div>
  );
};

export default UpdateCategory;
