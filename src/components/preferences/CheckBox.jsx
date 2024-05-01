import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown menu component
 * @param {Checkbox.propTypes} props 
 * @returns {JSX.Element} A button component
 */

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center space-x-2">
      <span className="text-white">{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox h-5 w-5 text-blue-600" />
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;