import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AppPng from "../assets/App.png";
import { useRoleContext } from "../hooks/RoleContext";


const Login = () => {
  const { Role } = useParams();
  const navigate = useNavigate();
  const {setrole} = useRoleContext();


  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [passwordHidden, setPasswordHidden] = useState(true); // State for password visibility

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value); // Generic function to handle input changes
  };

  const handlebutton = async () => {
    if(email.trim() === '' || password.trim() === ''){
      alert("ایمیل یا پسوورد نمی تواند خالی باشد");
      return;
    }

     try {
       const response = await axios.post(`http://localhost:3000/Login/${Role}`, { email, password });
       console.log(response);
       localStorage.setItem("Role" , Role +"-" + response.data.CustomerId );
       setrole(Role +"-" + response.data.CustomerId);
       if(Role === "Customer"){
        navigate("/UserMainPage");
       }else if (Role === "Manager"){
        navigate("")
       }

      // Handle success (e.g., save data to state)
     } catch (error) {
      console.error('Error logging in:', error);
      alert("نام کاربری یا رمز عبور اشتباه است . ")
      // Handle error
       }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-start gap-8">
        <div className="flex flex-col justify-start items-start">
          <p className="text-center mb-4 font-semibold text-pink-800">
            لطفا ابتدا وارد فودهاب شوید
          </p>
          <div className="relative mb-4 w-80">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2">
              email
            </span>
            <input
              value={email}
              onChange={handleInputChange(setEmail)} // Update state on change
              placeholder="ایمیل خود را وارد کنید"
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>
          <div className="relative mb-4 w-80">
            <span
              onClick={() => setPasswordHidden(!passwordHidden)}
              className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2  cursor-pointer"
            >
              {passwordHidden ? "visibility_off" : "visibility"}
            </span>
            <input
              value={password}
              onChange={handleInputChange(setPassword)} // Update state on change
              placeholder="رمز عبور خود را وارد کنید"
              type={passwordHidden ? "password" : "text"}
              className="w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-pink-500 bg-white"
            />
          </div>
          {Role !== "Admin" ? (
            <p onClick={() => navigate(`/SignUp/${Role}`)} className="cursor-pointer mb-4 text-pink-600 hover:underline">
              هنوز ثبت نام نکردی ؟
            </p>
          ) : null}
          <button onClick={handlebutton} className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
            ورود
          </button>
        </div>
        <div className="border-4 border-pink-200 p-3 rounded-3xl bg-white">
          <img src={AppPng} alt="App" />
        </div>
      </div>
    </div>
  );
};

export default Login;
