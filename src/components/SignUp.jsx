import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppPng from "../assets/App.png";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const {Role} = useParams();

  const [name, setName] = useState(""); // State for name input
  const [family, setFamily] = useState(""); // State for family input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [number, setNumber] = useState(""); // State for number input
  const [address , setAddress] = useState("");
  const [city , setCity] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true); // State for password visibility

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value); // Generic function to handle input changes
  };


  const handleSignUp = async () => {
    // Validate required fields
    if (
      name.trim() === "" ||
      family.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      number.trim() === "" ||
      (Role === "Customer" && (city.trim() === "" || address.trim() === ""))
    ) {
      alert("لطفا تمامی فیلدها را پر کنید");
      return;
    }
  
    // Prepare data for the API
    const payload = {
      email: email,
      name: name,
      familyName: family,
      password: password,
      phoneNumber: number,
    };
  
    // Add address and city if Role is Customer
    if (Role === "Customer") {
      payload.address = address;
      payload.city = city;
    }
  
    try {
      // Send POST request
      const response = await axios.post(`http://localhost:3000/SignUp/${Role}`, payload);
      console.log(response);
      
      // Handle success
      alert("ثبت نام با موفقیت انجام شد");
      navigate(`/Login/${Role}`);
    } catch (error) {
      // Handle error
      console.error("Error signing up:", error);
      alert("مشکلی در ثبت نام رخ داده است");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-start gap-8">
        <div className="flex flex-col justify-start items-start">
          <p className="text-center mb-4 font-semibold text-pink-800">
            لطفا اطلاعات خود را وارد کنید
          </p>

          {/* Name Input */}
          <div className="relative mb-4 w-80">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
              person
            </span>
            <input
              value={name}
              onChange={handleInputChange(setName)}
              placeholder="نام خود را وارد کنید"
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

          {/* Family Name Input */}
          <div className="relative mb-4 w-80">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
              group
            </span>
            <input
              value={family}
              onChange={handleInputChange(setFamily)}
              placeholder="نام خانوادگی خود را وارد کنید"
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

          {/* Email Input */}
          <div className="relative mb-4 w-80">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
              email
            </span>
            <input
              value={email}
              onChange={handleInputChange(setEmail)}
              placeholder="ایمیل خود را وارد کنید"
              type="email"
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4 w-80">
            <span
              onClick={() => setPasswordHidden(!passwordHidden)}
              className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 cursor-pointer"
            >
              {passwordHidden ? "visibility_off" : "visibility"}
            </span>
            <input
              value={password}
              onChange={handleInputChange(setPassword)}
              placeholder="رمز عبور خود را وارد کنید"
              type={passwordHidden ? "password" : "text"}
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

          {/* Number Input */}
          <div className="relative mb-4 w-80">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
              phone
            </span>
            <input
              value={number}
              onChange={handleInputChange(setNumber)}
              placeholder="شماره تلفن خود را وارد کنید"
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

          {
            Role === "Customer" ?
            (
              <>
              <div className="relative mb-4 w-80">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
            location_on
            </span>
            <input
              value={address}
              onChange={handleInputChange(setAddress)}
              placeholder="آدرس خود را وارد کنید"
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>



          <div className="relative mb-4 w-80">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
            location_city
            </span>
            <input
              value={city}
              onChange={handleInputChange(setCity)}
              placeholder="شهر خود را وارد کنید"
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

              </>              
            ) : null
          }

          <button
            onClick={handleSignUp}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            ثبت نام
          </button>
        </div>

        <div className="border-4 border-pink-200 p-3 rounded-3xl bg-white">
          <img src={AppPng} alt="App" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
