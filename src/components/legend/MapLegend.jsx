import React, { useEffect, useState } from "react";
import LegendCard from "./LegendCard";
import legendData from "../../data/legendData";
import { ExpandMore as DownIcon, ExpandLess as UpIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const MapLegend = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(document.getElementById("legend-content").clientHeight);
  }, []);

  const toggleLegend = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="absolute z-[9999] bottom-0 left-1" id='legend'>
      <motion.div
        initial={{ x: 5 }}
        animate={{ y: isExpanded ? 0 : height }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start overflow-hidden shadow-lg"
      >
        <button
          onClick={toggleLegend}
          className="w-[65px] h-10 bg-[#535C91] bg-opacity-50 hover:bg-opacity-25 rounded-t-lg px-2 flex items-center justify-center"
        >
          {isExpanded ? <DownIcon className="text-white" /> : <UpIcon className="text-white" />}
        </button>
        <div id="legend-content" className="grid grid-cols-2 bg-[#535C91] rounded-tr-lg bg-opacity-50 gap-1 px-2 pt-2 ">
          <h1 className="col-span-2">Legend</h1>
          {legendData.map((item, index) => (
            <LegendCard key={index} name={item.name} icon={item.icon} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
export default MapLegend;


<div className="grid grid-cols-2 gap-1 px-2 pt-2">
  {legendData.map((item, index) => (
    <LegendCard key={index} name={item.name} icon={item.icon} />
  ))}
</div>;