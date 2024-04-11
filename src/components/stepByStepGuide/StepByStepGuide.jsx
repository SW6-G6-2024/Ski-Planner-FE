import PropTypes from 'prop-types';

/**
 * Component for each step in the step-by-step guide
 * @param {Array} guide - The guide array containing steps of the step-by-step guide.
 * @returns {JSX.Element} A component rendering each guide step on a new line.
 */
const StepByStepGuide = ({ guide }) => {
  return (
    <>
      {guide.map((step, index) => (
        <div key={index}>{step}</div>
      ))}
    </>
  );
};

StepByStepGuide.propTypes = {
  guide: PropTypes.array.isRequired,
};

export default StepByStepGuide;
