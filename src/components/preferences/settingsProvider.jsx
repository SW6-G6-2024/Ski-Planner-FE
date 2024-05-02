import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SettingsContext from '../../contexts/settingsContext';

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    "Button lift": true,
    "Very easy piste": true,
    "Chair lift": true,
    "Easy piste": true,
    "Gondola lift": true,
    "Medium piste": true,
    "T-bar lift": true,
    "Expert piste": true,
    "Lift": true,
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
