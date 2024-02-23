import LegendCard from "./LegendCard";
import legendData from "../../data/legendData";

console.log(legendData);

const MapLegend = () => {
  return (
    <div className="flex-1 fixed z-[9999] bottom-0 left-0 bg-legendbg bg-opacity-50 rounded-tr-lg p-2 drop-shadow-lg">
      <div className="flex-col">
        {legendData.map((item, index) => (
          <LegendCard key={index} name={item.name} icon={item.icon}/>
        ))}
      </div>
    </div>
  );
}
export default MapLegend;