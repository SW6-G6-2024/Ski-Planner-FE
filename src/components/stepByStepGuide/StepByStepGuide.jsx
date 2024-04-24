import PropTypes from 'prop-types';
import { getLiftIcon, difficultyToIcon } from '../../utils/getIcons.js';

/**
 * Component for each step in the step-by-step guide
 * @param {Array} guide - The guide array containing steps of the step-by-step guide.
 * @returns {JSX.Element} A component rendering each guide step on a new line.
 */
const StepByStepGuide = ({ guide }) => {

  function cutString(string, length = 20) {
    return string.length > length ? string.substring(0, length - 3) + '...' : string;
  }

  function pisteString(name) {
    if (!name.toLowerCase().match(/[0-9]+/)) {
      return 'TP';
    }
    return name;
  }

  return (
    <div className='flex flex-col place-items-center'>
      {guide.map((step, index) => {
        return (<>
          {(index !== 0) && <div className='w-[0] h-[10px] border-r-2 border-slate-400'></div>}
          {step.difficulty ?
              <div className='relative'>
                <object
                  className='w-[60px]'
                  id={step.name.replace(' ', '-') + '-icon'}
                  key={index}
                  data={difficultyToIcon(step.difficulty)}
                  type="image/svg+xml"
                />
                <p className='absolute text-white font-bold text-lg left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'>{pisteString(step.name)}</p>
              </div>
            :
            <div className='flex flex-col place-items-center border border-slate-400 border-dotted rounded-full py-1 w-[75%]'>
              <object className='w-[60px] bg-orange-400 rounded-full p-2 h-[30%]' id={step.name.replace(' ', '-') + '-icon'} key={index} data={getLiftIcon(step.lift_type)} type="image/svg+xml" />
              <p className="text-white text-lg font-bold">{cutString(step.name, 20)}</p>
            </div>
          }
        </>);
      })}
    </div>
  );
};

StepByStepGuide.propTypes = {
  guide: PropTypes.array.isRequired,
};

export default StepByStepGuide;
