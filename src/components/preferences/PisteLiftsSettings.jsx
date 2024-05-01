import React from 'react';
import Checkbox from './CheckBox';
import PropTypes from 'prop-types';
import legendData from '../../data/legendData'; // Adjust the import path as needed

const PisteLiftsSettings = ({ settings, setSettings }) => {
  // Filtering legend data for pistes and lifts
  const pisteData = legendData.filter(item => item.name.includes("piste") && item.name !== "Non-prepared piste");
  const liftData = legendData.filter(item => item.name.includes("lift") && !item.name.includes("piste"));

  // Handler to toggle settings
  const toggleSetting = (name) => {
    setSettings(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Reset all settings to true
  const resetSettings = () => {
    const reset = {};
    legendData.forEach(item => {
      reset[item.name] = true;
    });
    setSettings(reset);

  };
  return (
    <div className="relative p-4 bg-gray-800 bg-opacity-75 rounded-lg space-y-4">
      <button
        onClick={resetSettings}
        className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
        Reset
      </button>
      <div className="text-white text-2xl">Pistes</div>
      <div className="grid grid-cols-2 gap-2">
        {pisteData.map((item) => (
          <Checkbox
            key={item.name}
            label={<span><img src={item.icon} alt={item.name} className="inline-block h-7 w-7 mr-2 bg-white rounded" /></span>}
            checked={settings[item.name]}
            onChange={() => toggleSetting(item.name)}
          />
        ))}
      </div>
      <div className="text-white text-2xl">Lifts</div>
      <div className="grid grid-cols-2 gap-2">
        {liftData.map((item) => (
          <Checkbox
            key={item.name}
            label={<span><img src={item.icon} alt={item.name} className="inline-block h-7 w-7 mr-2 bg-white rounded" /></span>}
            checked={settings[item.name]}
            onChange={() => toggleSetting(item.name)}
          />
        ))}
      </div>
    </div>
  );
};

PisteLiftsSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  setSettings: PropTypes.func.isRequired,
};

export default PisteLiftsSettings;
