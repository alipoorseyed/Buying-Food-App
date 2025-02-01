import { useState } from "react";
import UpdateRestaurantInfo from "./UpdateRestaurantInfo"
import UpdateMenuInfo from "./UpdateMenuInfo";
import UpdateWorkingHours from "./UpdateWorkingHours";
import UpdateCategory from "./UpdateCategory";

const ManagerPersonal = () => {
    const [state, setState] = useState("AllOrder");
  
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">اطلاعات شخصی</h1>
        <div className="flex justify-start items-center gap-4 mb-6">
          <button onClick={() => setState("UpdateInfo")} className="bg-gray-200 px-4 py-2 rounded">
            آپدیت اطلاعات رستوران
          </button>
          <button onClick={() => setState("UpdateHours")} className="bg-gray-200 px-4 py-2 rounded">
            آپدیت بازه‌های کاری رستوران
          </button>
          <button onClick={() => setState("UpdateMenu")} className="bg-gray-200 px-4 py-2 rounded">
            آپدیت منوی رستوران
          </button>
          <button onClick={() => setState("UpdateCategory")} className="bg-gray-200 px-4 py-2 rounded">
            اضافه کردن کتگوری
          </button>
        </div>
  
        {/* نمایش کامپوننت بر اساس وضعیت state */}
        {state === "UpdateInfo" && <UpdateRestaurantInfo />}
        {state === "UpdateHours" && <UpdateWorkingHours /> }
        {state === "UpdateMenu" && <UpdateMenuInfo />}
        {state === "UpdateCategory" && <UpdateCategory />}
      </div>
    );
  };
  
  export default ManagerPersonal