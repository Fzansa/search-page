import React, { useEffect, useRef, useState } from "react";
import "../custom.css";

const DateRangePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleFocusStart = () => {
    startDateRef.current.showPicker();
  };

  const handleFocusEnd = () => {
    endDateRef.current.showPicker();
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Handle start date change
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate !== startDate) {
      setStartDate(newStartDate);
    }
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate !== endDate) {
      setEndDate(newEndDate);
    }
  };

  // Trigger onDateChange only when both dates are set
  useEffect(() => {
    if (startDate && endDate) {
      onDateChange({ startDate, endDate });
    }
  }, [startDate, endDate]);

  return (
    <div id="date-range-picker" className="flex items-center">
      {/* Start Date */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          id="datepicker-range-start"
          name="start"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          onClick={handleFocusStart}
          ref={startDateRef}
          className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Select date start"
          max={today} // Set max to today's date
        />
      </div>

      <span className="mx-4 text-gray-500">to</span>

      {/* End Date */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          id="datepicker-range-end"
          name="end"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          onClick={handleFocusEnd}
          ref={endDateRef}
          className="bg-gray-50 border border-gray-300 cursor-pointer text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Select date end"
          max={today} // Set max to today's date
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
