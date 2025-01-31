import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BuyingFinalPage = () => {
    const location = useLocation();
    const { BuyingItem, Resturant } = location.state || {};  // Ensure no errors if state is undefined
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [newCity, setNewCity] = useState("");
    
    

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        const id = localStorage.getItem("Role").split("-")[1];
        
        
        try {
            const response = await axios.post("http://localhost:3000/GetAddressByCustomerId" , {
                id : id,
            });

            const response2 = await axios.post("http://localhost:3000/GetCustomerById" , {
                id : id,
            });


            const newResponse = response.data.map((element) => {
                return element.Address;
            })
            
            
            setAddresses(newResponse);
            setSelectedAddress(response2.data[0].CustomerPrimaryAddress);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    const handleSelectAddress = async (address) => {
        setSelectedAddress(address);
        try {
            await axios.post("http://localhost:3000/setPrimaryAddress", { address  });
        } catch (error) {
            console.error("Error updating primary address:", error);
        }
    };

    const handleAddAddress = async () => {
        const id = localStorage.getItem("Role").split("-")[1];
        if (!newAddress.trim() && !newCity.trim()){
            alert("تمام فیلد ها را پر کنید")
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/AddAddress", {
                CustomerId : id,
                AddressCity : newCity , 
                Address : newAddress
            });
            console.log(response);
            
            fetchAddresses();
            setNewCity("")
            setNewAddress("");
        } catch (error) {
            console.error("Error adding new address:", error);
        }
    };

    return (
        <div className="flex flex-col justify-start items-center p-6">
            <h1 className="text-3xl font-bold text-pink-700 mb-6">تکمیل خرید</h1>
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">
                <p className="text-xl font-semibold text-gray-700 mb-4">
                    رستوران: <span className="text-pink-600">{Resturant?.RestaurantName}</span>
                </p>
                
                {/* بخش انتخاب آدرس */}
                <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
                    <p className="text-lg font-medium text-gray-700">آدرس اصلی: {selectedAddress}</p>
                    <button 
                        onClick={() => document.getElementById("address-list").classList.toggle("hidden")}
                        className="mt-2 px-4 py-2 bg-pink-300 rounded-lg hover:bg-pink-400 transition"
                    >
                        تغییر آدرس
                    </button>
                    <ul id="address-list" className="hidden mt-4 bg-white p-2 rounded-lg shadow-md">
                        {addresses.map((address, index) => (
                            <li key={index} className="p-2 cursor-pointer hover:bg-gray-200 rounded" onClick={() => handleSelectAddress(address)}>
                                {address}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* اضافه کردن آدرس جدید */}
                <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
                    <input 
                        type="text" 
                        value={newAddress} 
                        onChange={(e) => setNewAddress(e.target.value)} 
                        className="p-2 w-full border rounded" 
                        placeholder="آدرس جدید را وارد کنید"
                    />
                    <input 
                        type="text" 
                        value={newCity} 
                        onChange={(e) => setNewCity(e.target.value)} 
                        className="p-2 w-full border rounded mt-2" 
                        placeholder="شهر جدید را وارد کنید"
                    />
                    <button 
                        onClick={handleAddAddress} 
                        className="mt-2 px-4 py-2 bg-green-400 rounded-lg hover:bg-green-500 transition w-full"
                    >
                        افزودن آدرس
                    </button>
                </div>

                <ul className="space-y-4">
                    {BuyingItem?.map((item, index) => (
                        <li key={index} className="p-4 bg-pink-200 rounded-xl shadow-sm">
                            <p className="text-lg font-medium text-gray-800">نام غذا: {item.name}</p>
                            <p className="text-gray-600">تعداد: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BuyingFinalPage;
