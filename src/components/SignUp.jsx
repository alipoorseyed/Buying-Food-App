import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppPng from "../assets/App.png";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(""); // State for name input
  const [family, setFamily] = useState(""); // State for family input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [number, setNumber] = useState(""); // State for number input
  const [passwordHidden, setPasswordHidden] = useState(true); // State for password visibility

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value); // Generic function to handle input changes
  };

  const handleSignUp = () => {
    if (
      name.trim() === "" ||
      family.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      number.trim() === ""
    ) {
      alert("لطفا تمامی فیلدها را پر کنید");
      return;
    }

    // Handle successful signup logic here
    alert("ثبت نام با موفقیت انجام شد");
    navigate("/Login");
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
