import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SettingsContext from '../../contexts/settingsContext';

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    black: true,      // maps to "Expert piste"
    blue: true,       // maps to "Easy piste"
    green: true,      // maps to "Very easy piste"
    red: true,        // maps to "Medium piste"
    chairLift: true,  // maps to "Chair lift"
    gondolaLift: true,    // maps to "Gondola lift"
    buttonLift: true,    // maps to "Button lift"
    tBarLift: true        // maps to "T-bar lift"
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
