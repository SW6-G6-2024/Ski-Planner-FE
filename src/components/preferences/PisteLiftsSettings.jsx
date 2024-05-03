import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Checkbox from './CheckBox';
import PropTypes from 'prop-types';
import legendData from '../../data/legendData'; // Adjust the import path as needed
import { useAuth0 } from '@auth0/auth0-react';
import { patchUserPreferences } from '../../services/userService';

const settingsMapping = {
  "Button lift": "platter",
  "Very easy piste": "green",
  "Chair lift": "chair",
  "Easy piste": "blue",
  "Gondola lift": "gondola",
  "Medium piste": "red",
  "T-bar lift": "tBar",
  "Expert piste": "black"
};

const PisteLiftsSettings = ({ settings, setSettings }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [height, setHeight] = useState(0);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const contentHeight = document.getElementById("settings-content").clientHeight;
    setHeight(contentHeight);
  }, []);

  const showSettings = () => {
    setIsExpanded(!isExpanded);
  };

  // Handler to toggle settings
  const toggleSetting = (name) => {
    const settingKey = settingsMapping[name];
    setSettings(prev => ({
      ...prev,
      [settingKey]: !prev[settingKey]
    }));
  };

  const saveSettings = async () => {
    const token = await getAccessTokenSilently({
      cacheMode: 'no-cache',
      authorizationParams: {
        scope: 'update:preferences',
        audience: 'http://localhost:8888'
      }
    });

    try {
      const requestBody = {
        settings: settings,
      };

      const data = await patchUserPreferences(requestBody, user.sub, token);
      if (data) {
        const { pisteDifficulties, liftTypes } = data;

        // Flatten the incoming data and update state
        const updatedSettings = {
          ...pisteDifficulties,
          ...liftTypes
        };

        setSettings(updatedSettings);
      }
    } catch (error) {
      console.error(error);
    }
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
    <div className="fixed bottom-0 right-20 flex flex-col items-center" id="settings-slider" style={{ zIndex: isExpanded ? 1001 : 500 }}>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? height : 40 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden shadow-lg"
      >
        <button
        onClick={showSettings}
        className="h-10 w-20 bg-gray-800 bg-opacity-50 hover:bg-opacity-25 rounded-t flex items-center justify-center z-10"
      >
        {isExpanded ? 'Hide' : 'Show'}
      </button>
        <div id="settings-content" className="w-60 h-80 bg-gray-800 bg-opacity-75 rounded-lg p-4">
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
          <div className='mt-4'>
            <button onClick={resetSettings} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-4 rounded">
              Reset
            </button>
            <button onClick={saveSettings} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

PisteLiftsSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  setSettings: PropTypes.func.isRequired,
};

export default PisteLiftsSettings;