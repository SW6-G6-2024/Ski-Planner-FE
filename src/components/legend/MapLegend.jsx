import React, { useState } from "react";
import LegendCard from "./LegendCard";
import legendData from "../../data/legendData";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Slide } from "@mui/material";

const MapLegend = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleLegend = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex-1 fixed z-[9999] bottom-0 left-0 bg-legendbg bg-opacity-50 rounded-tr-lg p2 drop-shadow-lg transition-all">
      <Slide direction="right" in={isExpanded} mountOnEnter unmountOnExit>
      <div className="grid grid-cols-2 gap-1 px-2 pt-2">
          {legendData.map((item, index) => (
            <LegendCard key={index} name={item.name} icon={item.icon} />
          ))}
        </div>
      </Slide>
      <div
        className="hover:bg-legendinteract rounded-md hover:bg-opacity-25 cursor-pointer m-2 w-10"
        onClick={toggleLegend}
      >
        {isExpanded ? (
          <ChevronLeftIcon className="text-white" />
        ) : (
          <ChevronRightIcon className="text-white" />
        )}
      </div>
    </div>
    
  );
};
export default MapLegend;
