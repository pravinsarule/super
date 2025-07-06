

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Timeline</h2>
      
      <Calendar
        onChange={setDate}
        value={date}
        className="border-none w-full"
        tileClassName="text-sm" // smaller tiles for mobile
      />

      <button className="mt-4 w-full py-2 bg-blue-500 text-white text-sm rounded-lg active:bg-blue-600">
        Add Event +
      </button>
    </div>
  );
};

export default CalendarComponent;
