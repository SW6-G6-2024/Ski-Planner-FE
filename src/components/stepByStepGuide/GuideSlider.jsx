import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StepByStepGuide from './StepByStepGuide';
import LegendCard from "../legend/LegendCard";
import legendData from "../../data/legendData";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PropTypes from 'prop-types';

const GuideSlider = ({ guide }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const guideContentWidth = document.getElementById("guide-content").clientWidth;
    setWidth(guideContentWidth);
  }, []);

  const toggleGuide = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-1/2 left-0 -translate-y-1/2 z-[9999] flex items-center" id='guide-slider'>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isExpanded ? width : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden shadow-lg"
      >
        {/* Set the guide-content to a flex column container */}
        <div id="guide-content" className="flex flex-col w-80 bg-[#535C91] bg-opacity-80 p-4 h-screen">
          {/* Title remains the same */}
          <h2 className='text-3xl font-bold mb-4 text-white'>Step-by-step Guide</h2>
          {/* StepByStepGuide container flex grow and overflow */}
          <div className="flex-grow overflow-y-auto">
            <StepByStepGuide guide={guide} />
            {/* The white line is inside the scrollable area but always visible */}
            <div className="bg-white h-[2px] my-4"></div>
          </div>
          {/* Legend content is always at the bottom */}
          <div id="legend-content" className="pt-4">
            <h2 className="text-3xl font-bold mb-4 col-span-2 text-white">Legend</h2>
            {legendData.map((item, index) => (
              <LegendCard key={index} name={item.name} icon={item.icon} />
            ))}
          </div>
        </div>
      </motion.div>
      {/* Button remains the same */}
      <button
        onClick={toggleGuide}
        className="w-10 h-20 bg-[#535C91] bg-opacity-50 hover:bg-opacity-25 rounded-r flex items-center justify-center z-10"
      >
        {isExpanded ? <KeyboardArrowLeftIcon className="text-white" /> : <KeyboardArrowRightIcon className="text-white" />}
      </button>
    </div>
  );
};

GuideSlider.propTypes = {
  guide: PropTypes.array.isRequired
};

export default GuideSlider;
