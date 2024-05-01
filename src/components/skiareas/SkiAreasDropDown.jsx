import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/**
 * Dropdown menu component
 * @param {Button.propTypes} props 
 * @returns {JSX.Element} A button component
 */

const SkiAreaDropDown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef(null);

  const handleSelect = (skiAreaId, newCenter) => {
    onSelect(skiAreaId, newCenter);
    setIsOpen(false);
  };

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

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        id='ski-area-dropdown-button'
        onClick={toggleDropdown}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-base font-bold w-42 h-11"
      >
        Select Ski Area <ArrowDropDownIcon />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 bg-white shadow-lg">
          <button onClick={() => handleSelect('65d4a9dbecaa09d942314101', [61.3140, 12.1971])} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">Trysil</button>
          <button onClick={() => handleSelect('65d4a9dbecaa09d942314102', [57.4344, 13.6147])} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">Isaberg</button>
          <button onClick={() => handleSelect('6620d40250c012926c59023c', [47.1385, 13.1054])} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">Bad Gastein</button>
        </div>
      )}
    </div>
  );
};

SkiAreaDropDown.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SkiAreaDropDown;