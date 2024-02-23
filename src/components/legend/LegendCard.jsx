const LegendCard = ({name, icon}) => {
  return (
    <div className="transition-all duration-300 ease-in-out flex legend-card flex-row items-center">
      <img src={icon} alt="icon" className="size-8 pr-2" />
      <div className="text-white cursor-default">{name}</div>
    </div>
  );
}

export default LegendCard;