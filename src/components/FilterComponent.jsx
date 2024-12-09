import React, { useState } from 'react';

const FilterComponent = () => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const categories = ["Business", "Entertainment", "Health", "Science", "Sports", "Technology"];
  const locations = ["United States", "United Kingdom", "India", "Australia", "Canada"];
  const sortOptions = ["Relevance", "Date", "Popularity"];

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {/* Top Filter Section */}
      <div className="flex flex-wrap gap-6 justify-between">
        {/* Category Filter */}
        <div className="w-full sm:w-1/3">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="w-full sm:w-1/3">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <select
            id="location"
            name="location"
            value={location}
            onChange={handleLocationChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="w-full sm:w-1/3">
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">Sort By</label>
          <select
            id="sortBy"
            name="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Sorting</option>
            {sortOptions.map((option, index) => (
              <option key={index} value={option.toLowerCase()}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Date Range</label>
        <div className="flex gap-4">
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-blue-500 text-white py-2 mt-6 rounded-md hover:bg-blue-600 transition">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterComponent;
