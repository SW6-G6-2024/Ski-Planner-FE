import { createContext, useContext } from 'react';

const SettingsContext = createContext(null);

export const useSettings = () => useContext(SettingsContext);

export default SettingsContext;
