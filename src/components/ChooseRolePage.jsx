// import React from 'react'
import UserPng from "../assets/User.png";
import ResturantManagerPng from "../assets/ResturantManager.png";
import AdminPng from "../assets/Admin.png";
import AppPng from "../assets/App.png"
import { useRoleContext } from "../hooks/RoleContext";

export const ChooseRolePage = () => {
  const {setrole} = useRoleContext();
  const handleRole = (role) => {
    setrole(role);
  }
  return (
    <>
    <div className="text-center pb-8">به فود هاب خوش اومدین</div>
    <div className="flex justify-center items-stretch gap-16">
      <div className="flex flex-col justify-center items-center gap-6">
        <div onClick={() => handleRole("user")} className="flex flex-col justify-center items-center p-3 gap-2 rounded-xl bg-slate-200 border-2  border-gray-400 cursor-pointer">
          <img className="w-32" src={UserPng} alt="" />
          <p>کاربر عادی</p>
        </div>
        <div onClick={() => handleRole("manager")} className="flex flex-col justify-center items-center p-3 gap-2 rounded-xl bg-slate-200 border-2 border-gray-400 cursor-pointer">
          <img className="w-32" src={ResturantManagerPng} alt="" />
          <p>مدیر رستوران</p>
        </div>
        <div onClick={() => handleRole("admin")} className="flex flex-col justify-center items-center p-3 gap-2 rounded-xl bg-slate-200 border-2 border-gray-400 cursor-pointer">
          <img className="w-32" src={AdminPng} alt="" />
          <p>ادمین</p>
        </div>
      </div>
      <div className="border-4 border-pink-200 p-3 rounded-3xl bg-purple-50">
        <img src={AppPng} alt="" />
      </div>
    </div>
    </>
  );
}
