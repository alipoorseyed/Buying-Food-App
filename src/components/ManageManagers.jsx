import { useState, useEffect } from "react";
import axios from "axios";

const ManageManagers = () => {
  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({
    name: "",
    familyName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    const res = await axios.get("http://localhost:3000/AllManagers");
    console.log(res);
    
    setManagers(res.data);
  };

  const deleteManager = async (id) => {
    await axios.post("http://localhost:3000/DeleteManager", { id });
    fetchManagers();
  };

  const addManager = async () => {
    await axios.post("http://localhost:3000/AddManager", newManager);
    fetchManagers();
    setNewManager({
      name: "",
      familyName: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-pink-700 mb-4">لیست مدیران</h2>
      <ul>
        {managers.map((m) => (
          <li key={m.ManagerId} className="flex justify-between p-3 border-b">
            {m.ManagerName} {m.ManagerFamilyName} {" / " +  "آیدی - " + m.ManagerId}
            <button onClick={() => deleteManager(m.ManagerId)} className="bg-red-500 text-white px-2 py-1 rounded">
              حذف
            </button>
          </li>
        ))}
      </ul>

      {/* افزودن مدیر جدید */}
      <h3 className="text-lg font-bold mt-4">افزودن مدیر</h3>
      <div className="grid grid-cols-2 gap-2">
        <input type="text" placeholder="نام" value={newManager.name} onChange={(e) => setNewManager({ ...newManager, name: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="نام خانوادگی" value={newManager.familyName} onChange={(e) => setNewManager({ ...newManager, familyName: e.target.value })} className="border p-2 rounded" />
        <input type="email" placeholder="ایمیل" value={newManager.email} onChange={(e) => setNewManager({ ...newManager, email: e.target.value })} className="border p-2 rounded" />
        <input type="password" placeholder="رمز عبور" value={newManager.password} onChange={(e) => setNewManager({ ...newManager, password: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="شماره تلفن" value={newManager.phoneNumber} onChange={(e) => setNewManager({ ...newManager, phoneNumber: e.target.value })} className="border p-2 rounded" />
      </div>
      <button onClick={addManager} className="bg-green-500 text-white px-3 py-2 rounded mt-3 w-full">
        افزودن مدیر
      </button>
    </div>
  );
};

export default ManageManagers;
