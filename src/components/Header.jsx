import React, { useState, useEffect, useRef } from "react";
import countries from "../utils/countries";
import "../custom.css";

const Header = ({ onSearch, sources,onSourceChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState({
    name: "All Countries",
  });
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    onSearch(query);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSourceSelect = (source) => {
    setSelectedSource(source);
    onSourceChange(source); // Send selected source to App.js
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white relative">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="logo.png" alt="Justdial Logo" className="h-10" />
        </div>

        {/* Search Bar */}
        <form
          className="flex items-center md:w-2/3 mx-auto md:relative absolute bottom-[-50px] md:bottom-0 w-[80%] left-[50%] translate-x-[-50%] md:left-auto md:translate-x-0"
          onSubmit={handleSearch}
        >
          <div className="flex w-full">
            <div className="relative" ref={dropdownRef}>
              <button
                id="dropdown-button"
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg min-w-0 whitespace-nowrap text-ellipsis"
                type="button"
                onClick={toggleDropdown}
              >
                <span className="truncate">{selectedSource?.name}</span>
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className="z-10 absolute top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 max-h-[300px] overflow-y-scroll"
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedSource({
                            name: "All Countries",
                          });
                          handleSourceSelect({
                            name: "All Countries",
                          })
                          setIsDropdownOpen(false);
                        }}
                      >
                        All Countries
                      </button>
                    </li>
                    {countries?.length > 0 ? (
                      countries.map((item) => (
                        <li key={item?.code}>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedSource(item);
                              handleSourceSelect(item)
                              setIsDropdownOpen(false);
                            }}
                          >
                            {item?.name}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-400">
                        No sources available
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block h-full p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for services, products, or businesses..."
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg border border-primary hover:bg-dprimary focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* Login/Sign Up */}
        <button className="bg-primary text-white py-1 px-2 font-semibold rounded-md hover:bg-dprimary">
          Login / Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
