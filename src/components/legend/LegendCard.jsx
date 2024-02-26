import PropTypes from 'prop-types';

/**
 * Card for each entry in the legend
 * To add a new entry, add it to the legendData.js file
 * @param {name} name of the entry
 * @param {icon} url for the path to the icon 
 */
const LegendCard = ({name, icon}) => {
  return (
    <div className="transition-all duration-300 ease-in-out flex legend-card items-center mb-1">
      <img src={icon} alt="icon" className="size-8 mx-2 bg-white" />
      <div className="text-white cursor-default text-sm">{name}</div>
    </div>
  );
};

LegendCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default LegendCard;