import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PropTypes from "prop-types";

const options = ["Generate Shortest Route", "Generate Best Route"];

function GenerateRouteBtn({ bestRoute, shortestRoute }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    if (selectedIndex === 0) {
      bestRoute();
    } else {
      shortestRoute();
    }
    console.log(selectedIndex);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex">
        <button
          onClick={handleClick}
          className=" bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-l text-base font-bold w-[220px] h-11 border-r-2 border-blue-400 "
        >
          {options[selectedIndex]}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-r text-base font-bold w-6 h-11 text-center flex items-center justify-center"
          onClick={toggleDropdown}
        >
          <ArrowDropDownIcon />
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-1 bg-white shadow-lg">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={(event) => handleMenuItemClick(event, index)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenerateRouteBtn;

GenerateRouteBtn.propTypes = {
  bestRoute: PropTypes.func,
  shortestRoute: PropTypes.func,
};
