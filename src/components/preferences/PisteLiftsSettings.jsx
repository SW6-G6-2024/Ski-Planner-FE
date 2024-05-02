import React from 'react';
import Checkbox from './CheckBox';
import PropTypes from 'prop-types';
import legendData from '../../data/legendData'; // Adjust the import path as needed

const settingsMapping = {
  "Button lift": "buttonLift",
  "Very easy piste": "green",
  "Chair lift": "chairLift",
  "Easy piste": "blue",
  "Gondola lift": "gondolaLift",
  "Medium piste": "red",
  "T-bar lift": "tBarLift",
  "Expert piste": "black"
};

const PisteLiftsSettings = ({ settings, setSettings }) => {
  // Handler to toggle settings
  const toggleSetting = (name) => {
    const settingKey = settingsMapping[name];
    setSettings(prev => ({
      ...prev,
      [settingKey]: !prev[settingKey]
    }));
  };

  // Reset all settings to true
  const resetSettings = () => {
    const reset = {};
    Object.keys(settingsMapping).forEach(item => {
      reset[settingsMapping[item]] = true;
    });
    setSettings(reset);
  };

  return (
    <div className="relative p-4 bg-gray-800 bg-opacity-75 rounded-lg space-y-4">
      <button onClick={resetSettings} className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
        Reset
      </button>
      <div className="text-white text-2xl">Pistes</div>
      <div className="grid grid-cols-2 gap-2">
        {legendData.filter(item => (item.name.includes("piste") && item.name !== "Non-prepared piste")).map((item) => (
          <Checkbox
            key={item.name}
            label={<span><img src={item.icon} alt={item.name} className="inline-block h-7 w-7 mr-2 bg-white rounded" /></span>}
            checked={settings[settingsMapping[item.name]]}
            onChange={() => toggleSetting(item.name)}
          />
        ))}
      </div>
      <div className="text-white text-2xl">Lifts</div>
      <div className="grid grid-cols-2 gap-2">
        {legendData.filter(item => item.name.includes("lift") && !item.name.includes("piste")).map((item) => (
          <Checkbox
            key={item.name}
            label={<span><img src={item.icon} alt={item.name} className="inline-block h-7 w-7 mr-2 bg-white rounded" /></span>}
            checked={settings[settingsMapping[item.name]]}
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
