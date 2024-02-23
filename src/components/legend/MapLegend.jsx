import React, { useState } from "react";
import LegendCard from "./LegendCard";
import legendData from "../../data/legendData";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MapLegend = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLegend = () => {
    console.log("toggleLegend");
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="flex-1 fixed z-[9999] bottom-0 left-0 bg-legendbg bg-opacity-50 rounded-tr-lg p-2 drop-shadow-lg">
      <div className="justify-center hover:bg-legendinteract rounded-lg hover:bg-opacity-25 cursor-pointer">
        {isExpanded ? <ExpandMoreIcon className="text-white" onClick={toggleLegend}/> : 
        <ExpandLessIcon className="text-white" onClick={toggleLegend}/>}
        
      </div>
      {isExpanded ?
        <div className="flex-col">
          {legendData.map((item, index) => (
            <LegendCard key={index} name={item.name} icon={item.icon} />
          ))}
        </div>
        : null
      }

    </div>
  );
}
export default MapLegend;