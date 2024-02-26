import React, { useState } from "react";
import LegendCard from "./LegendCard";
import legendData from "../../data/legendData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Slide } from "@mui/material";

const MapLegend = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLegend = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex-1 fixed z-[9999] bottom-0 left-0 bg-legendbg bg-opacity-50 rounded-tr-lg p2 drop-shadow-lg w-48 transition-all">
      <div
        className="justify-center hover:bg-legendinteract rounded-r-lg hover:bg-opacity-25 cursor-pointer my-2 mr-2"
        onClick={toggleLegend}
      >
        {isExpanded ? (
          <ExpandMoreIcon className="text-white" />
        ) : (
          <ExpandLessIcon className="text-white" />
        )}
      </div>
      <Slide direction="up" in={isExpanded} mountOnEnter unmountOnExit>
        <div className="flex-col">
          {legendData.map((item, index) => (
            <LegendCard key={index} name={item.name} icon={item.icon} />
          ))}
        </div>
      </Slide>
    </div>
  );
};
export default MapLegend;
