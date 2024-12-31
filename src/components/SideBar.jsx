import { useThemContext } from "../hooks/ThemContext";

export const SideBar = () => {
     const {them , setthem} = useThemContext();
     const changeThem = () => {
        if(them === "light"){
          localStorage.setItem("them","dark")
          document.body.classList.add("dark");
          setthem("dark");
        }else{
          localStorage.setItem("them","light")
          document.body.classList.remove("dark");
          setthem("light");
        }
     }
  return (
    <div className="group fixed top-0 right-0 h-screen flex flex-col justify-between items-center bg-white transition-all duration-300 ease-in-out w-20 hover:w-44 pt-6 pb-6 gap-8">
      <div className="flex flex-col justify-center items-center gap-4">
       <div className="flex justify-center items-center gap-4 cursor-pointer">
          <span className="material-icons text-black">home</span>
          <span className="hidden group-hover:block">صفحه اصلی</span>
        </div>
        <div className="flex justify-center items-center gap-4 cursor-pointer">
          <span className="material-icons text-black">contact_mail</span>
          <span className="hidden group-hover:block text-default-300">ارتباط با ما</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 cursor-pointer">
        <div onClick={changeThem} className="flex justify-center items-center gap-4">
          <span className={`material-icons ${them === "light" ? "text-yellow-400" : "text-black "}`}>{them === "light" ? "wb_sunny" : "dark_mode"}</span>
          <span className={`hidden group-hover:block ${them === "light" ? "text-yellow-400" : "text-black "} `}>{them === "light" ? "روشن" : "دارک"}</span>
        </div>
        <div className="flex justify-center items-center gap-4 cursor-pointer">
          <span className="material-icons text-black">logout</span>
          <span className="hidden group-hover:block">خروج</span>
        </div>
      </div>
    </div>
  );
};
