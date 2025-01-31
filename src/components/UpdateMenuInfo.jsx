import { useState, useEffect } from "react";
import axios from "axios";

const UpdateMenuInfo = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editItems, setEditItems] = useState({}); // برای ذخیره مقدارهای ویرایش شده
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const managerId = localStorage.getItem("Role").split("-")[1];

  const fetchMenuItems = async () => {
    try {
      const response1 = await axios.post(
        "http://localhost:3000/GetRestaurantByManagerId",
        { ManagerId: managerId }
      );

      const response2 = await axios.post(
        "http://localhost:3000/GetItemsOFResturant",
        { ResturantId: response1.data.RestaurantId }
      );

      setMenuItems(response2.data);

      // مقدار اولیه برای ویرایش تنظیم می‌شود
      const initialEditState = response2.data.reduce((acc, item) => {
        acc[item.ItemId] = { name: item.ItemName, price: item.ItemPrice };
        return acc;
      }, {});
      setEditItems(initialEditState);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/GetAllCategories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const updateItem = async (id) => {
    try {
      const updatedData = editItems[id];
      console.log(updatedData);

      const response1 = await axios.post(
        "http://localhost:3000/GetRestaurantByManagerId",
        { ManagerId: managerId }
      );
      
      const response2 = await axios.post("http://localhost:3000/UpdateItem", {
        id : id,
        RestaurantId : response1.data.RestaurantId,
        ItemName : updatedData.name,
        ItemPrice : updatedData.price
      });
      console.log(response2);
      
      fetchMenuItems(); // لیست را دوباره دریافت کن
    } catch (err) {
      console.error("Error updating menu item:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.post("http://localhost:3000/DeleteItem", { id });
      fetchMenuItems(); // لیست را دوباره دریافت کن
    } catch (err) {
      console.error("Error deleting menu item:", err);
    }
  };

  const addNewItem = async () => {
    try {
      const response1 = await axios.post(
        "http://localhost:3000/GetRestaurantByManagerId",
        { ManagerId: managerId }
      );

      await axios.post("http://localhost:3000/AddItem", {
        RestaurantId: response1.data.RestaurantId,
        ItemName: newItem.name,
        ItemPrice: newItem.price,
        Category: newItem.category,
      });

      setNewItem({ name: "", price: "", category: "", imageUrl: "" }); // پاک کردن فرم
      fetchMenuItems(); // لیست را دوباره دریافت کن
    } catch (err) {
      console.error("Error adding new menu item:", err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">آپدیت منوی رستوران</h2>

      <div className="flex flex-col">
        {menuItems.map((item) => (
          <div key={item.ItemId} className="flex items-center space-x-4 mb-3">
            <input
              type="text"
              value={editItems[item.ItemId]?.name || ""}
              onChange={(e) =>
                setEditItems({
                  ...editItems,
                  [item.ItemId]: { ...editItems[item.ItemId], name: e.target.value },
                })
              }
              className="border p-2 w-full rounded ml-4"
            />
            <input
              type="number"
              value={editItems[item.ItemId]?.price || ""}
              onChange={(e) =>
                setEditItems({
                  ...editItems,
                  [item.ItemId]: { ...editItems[item.ItemId], price: e.target.value },
                })
              }
              className="border p-2 w-full rounded"
            />
            <button
              onClick={() => updateItem(item.ItemId)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              بروزرسانی
            </button>
            <button
              onClick={() => deleteItem(item.ItemId)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              حذف
            </button>
          </div>
        ))}

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="نام آیتم جدید"
            className="border p-2 w-full rounded ml-4"
          />
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            placeholder="قیمت"
            className="border p-2 w-full rounded"
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border p-2 w-full rounded"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((category) => (
              <option key={category.CategoryId} value={category.Category}>
                {category.Category}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newItem.imageUrl}
            onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
            placeholder="لینک تصویر"
            className="border p-2 w-full rounded"
          />
          <button
            onClick={addNewItem}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            اضافه کردن آیتم جدید
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMenuInfo;
