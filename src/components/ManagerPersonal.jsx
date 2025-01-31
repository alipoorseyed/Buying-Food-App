// import React from 'react'

import { useState } from "react"

const ManagerPersonal = () => {
    const [state , setState] = useState("AllOrder");
  return (
    <>
    <div>اطلاعات شخصی</div>
    <div className="flex justify-start items-center gap-6">
        <button>لیست همه سفارش های رستوران</button>
        <button>اپدیت کردن اطلاعات رستوران</button>
        <button>اپدیت کردن بازه های کاری رستوران</button>
        <button>اپدیت کردن منوی رستوران</button>
    </div>
    {
        
    }
    </>
  )
}

export default ManagerPersonal