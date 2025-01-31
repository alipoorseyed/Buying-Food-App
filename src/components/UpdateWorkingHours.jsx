import { useState, useEffect } from "react";
import axios from "axios";

const UpdateWorkingHours = () => {
  const [workingHours, setWorkingHours] = useState([]);
  const [newShift, setNewShift] = useState({ day: "", time: "" });
  const id = localStorage.getItem("Role").split("-")[1];

  const fetchWorkingHours = async () => {
    try {
      const response1 = await axios.post("http://localhost:3000/GetRestaurantByManagerId", {
        ManagerId: id,
      });
  
      console.log("Restaurant Response: ", response1.data);
  
      if (!response1.data.RestaurantId) {
        console.error("Error: RestaurantId is undefined!");
        return;
      }
  
      const response2 = await axios.post("http://localhost:3000/GetScheduleByRestaurantId", {
        RestaurantId: response1.data.RestaurantId,
      });
  
      console.log("Working Hours Response: ", response2.data);
  
      // Ensure the response is an array
      setWorkingHours(response2.data);
    } catch (err) {
      console.error("Error fetching working hours:", err);
    }
  };
  

  const deleteShift = async (scheduleId) => {
    try {
      await axios.post("http://localhost:3000/DeleteSchedule", { id : scheduleId });
      fetchWorkingHours();
    } catch (err) {
      console.error("Error deleting shift:", err);
    }
  };

  const addShift = async () => {
    try {
        const response1 = await axios.post("http://localhost:3000/GetRestaurantByManagerId", {
            ManagerId: id,
          });
      const response2 = await axios.post("http://localhost:3000/AddSchedule", {
        RestaurantId : response1.data.RestaurantId,
        WeekDay : newShift.day,
        WorkingTime : newShift.time,
      });
      console.log(response2);
      setNewShift({ day: "", time: "" });
      fetchWorkingHours();
    } catch (err) {
      console.error("Error adding shift:", err);
    }
  };

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">بروزرسانی بازه‌های کاری</h2>

      {workingHours.length === 0 ? (
        <div>هیچ بازه‌کاری موجود نیست</div>
      ) : (
        workingHours.map((shift) => (
          <div key={shift.ScheduleID} className="flex items-center space-x-4 mb-3">
            <span className="font-semibold">{shift.WeekDay}</span>
            <span className="border p-2 rounded bg-gray-100">{shift.WorkingTime}</span>
            <button
              onClick={() => deleteShift(shift.ScheduleID)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              حذف
            </button>
          </div>
        ))
      )}

      <div className="flex items-center space-x-4 mt-4">
        <select
          value={newShift.day}
          onChange={(e) => setNewShift({ ...newShift, day: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">انتخاب روز</option>
          {["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <input
          type="text"
          value={newShift.time}
          onChange={(e) => setNewShift({ ...newShift, time: e.target.value })}
          placeholder="مثال: 10-14"
          className="border p-2 rounded"
        />
        <button
          onClick={addShift}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          اضافه کردن
        </button>
      </div>
    </div>
  );
};

export default UpdateWorkingHours;
