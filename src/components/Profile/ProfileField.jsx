import React from 'react';
import PropTypes from 'prop-types';

ProfileField.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	id: PropTypes.string,
};

/**
 * Profile field component to display profile information
 * @param {ProfileField.propTypes} props 
 * @returns {JSX.Element} A profile field component
 */
function ProfileField(props) {
	return (
		<div className='flex gap-5 justify-between border border-gray-200 py-2 px-5 rounded-md'>
			<p className="text-black">{props.label}</p>
      <p className="text-black">{props.value}</p>
		</div>
	);
}

export default ProfileField;