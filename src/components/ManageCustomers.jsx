import { useState, useEffect } from "react";
import axios from "axios";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    familyName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:3000/AllCustomers");
    console.log(res);
    
    setCustomers(res.data);
  };

  const deleteCustomer = async (id) => {
    await axios.post("http://localhost:3000/DeleteCustomer", { id });
    fetchCustomers();
  };

  const addCustomer = async () => {
    const respon = await axios.post("http://localhost:3000/AddCustomer", newCustomer);
    console.log(respon);
    
    fetchCustomers();
    setNewCustomer({
      name: "",
      familyName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      city: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-pink-700 mb-4">لیست مشتریان</h2>
      <ul>
        {customers.map((c) => (
          <li key={c.CustomerId} className="flex justify-between p-3 border-b">
            {c.CustomerName} {c.CustomerFamilyName}
            <button onClick={() => deleteCustomer(c.CustomerId)} className="bg-red-500 text-white px-2 py-1 rounded">
              حذف
            </button>
          </li>
        ))}
      </ul>

      {/* افزودن مشتری جدید */}
      <h3 className="text-lg font-bold mt-4">افزودن مشتری</h3>
      <div className="grid grid-cols-2 gap-2">
        <input type="text" placeholder="نام" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="نام خانوادگی" value={newCustomer.familyName} onChange={(e) => setNewCustomer({ ...newCustomer, familyName: e.target.value })} className="border p-2 rounded" />
        <input type="email" placeholder="ایمیل" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} className="border p-2 rounded" />
        <input type="password" placeholder="رمز عبور" value={newCustomer.password} onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="شماره تلفن" value={newCustomer.phoneNumber} onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="آدرس" value={newCustomer.address} onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="شهر" value={newCustomer.city} onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })} className="border p-2 rounded" />
      </div>
      <button onClick={addCustomer} className="bg-green-500 text-white px-3 py-2 rounded mt-3 w-full">
        افزودن مشتری
      </button>
    </div>
  );
};

export default ManageCustomers;
