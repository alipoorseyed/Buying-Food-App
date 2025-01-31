import UserPng from "../assets/User.png";
import ResturantManagerPng from "../assets/ResturantManager.png";
import AdminPng from "../assets/Admin.png";
import AppPng from "../assets/App.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ChooseRolePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const respon = localStorage.getItem("Role");
    if(respon){
      if(respon.split("-")[0] === "Customer"){
        navigate(`/UserMainPage`);
      }else if(respon.split("-")[0] === "Manager"){
        navigate(`/ManagerMainPage`);
      }
    }
  },[])

  return (
    <div>
      <div className="text-center pb-8">به فود هاب خوش اومدین</div>
      <div className="flex justify-center items-stretch gap-16">
        <div className="flex flex-col justify-center items-center gap-6">
          <div
            onClick={() => navigate("/Login/Customer")}
            className="flex flex-col justify-center items-center p-3 gap-2 rounded-xl bg-slate-200 border-2 border-gray-400 cursor-pointer transition-transform hover:scale-110"
          >
            <img className="w-32" src={UserPng} alt="User" />
            <p>کاربر عادی</p>
          </div>
          <div
            onClick={() => navigate("/Login/Manager")}
            className="flex flex-col justify-center items-center p-3 gap-2 rounded-xl bg-slate-200 border-2 border-gray-400 cursor-pointer transition-transform hover:scale-110"
          >
            <img className="w-32" src={ResturantManagerPng} alt="Manager" />
            <p>مدیر رستوران</p>
          </div>
          <div
            onClick={() => navigate("/Login/Admin")}
            className="flex flex-col justify-center items-center p-3 gap-2 rounded-xl bg-slate-200 border-2 border-gray-400 cursor-pointer transition-transform hover:scale-110"
          >
            <img className="w-32" src={AdminPng} alt="Admin" />
            <p>ادمین</p>
          </div>
        </div>
        <div className="border-4 border-pink-200 p-3 rounded-3xl bg-purple-50">
          <img src={AppPng} alt="App" />
        </div>
      </div>
    </div>
  );
};
