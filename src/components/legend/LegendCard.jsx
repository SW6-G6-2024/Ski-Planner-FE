import PropTypes from 'prop-types';

/**
 * Card for each entry in the legend
 * To add a new entry, add it to the legendData.js file
 * @param {String} name of the entry
 * @param {String} url for the path to the icon 
 * @returns {JSX.Element} LegendCard
 */
const LegendCard = (props) => {
  return (
    <div className="transition-all duration-300 ease-in-out flex legend-card items-center mb-1">
      <object id={props.name.replace(' ', '-') + '-icon'} data={props.icon} type="image/svg+xml" className="size-8 mx-2 bg-white" aria-label={props.name} />
      <div className="text-white cursor-default text-sm">{props.name}</div>
    </div>
  );
};

LegendCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default LegendCard;