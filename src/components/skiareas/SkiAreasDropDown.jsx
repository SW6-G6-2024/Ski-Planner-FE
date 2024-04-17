import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown menu component
 * @param {Button.propTypes} props 
 * @returns {JSX.Element} A button component
 */

const SkiAreaDropDown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (skiAreaId, newCenter) => {
    onSelect(skiAreaId, newCenter);
    setIsOpen(false);
  };

  return (
    <div className="absolute right-[270px] top-5 z-[10000] bg-red-400 hover:bg-red-200 rounded-md shadow-xl hover:shadow-sm">
      <button
        id='ski-area-dropdown-button'
        onClick={toggleDropdown}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-base font-bold w-42 h-11"
      >
        Select Ski Area
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 bg-white shadow-lg">
          <button onClick={() => handleSelect('65d4a9dbecaa09d942314101', [61.3140, 12.1971])} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">Trysil</button>
          <button onClick={() => handleSelect('65d4a9dbecaa09d942314102', [57.4344, 13.6147])} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">Isaberg</button>
        </div>
      )}
    </div>
  );
};

SkiAreaDropDown.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SkiAreaDropDown;