import React from 'react';
import PropTypes from 'prop-types';

const ProfileField = (props) => {
	return (
		<div className='flex gap-5 justify-between border border-gray-200 py-2 px-5 rounded-md'>
			<p>{props.label}</p>
			<p>{props.value}</p>
		</div>
	);
};

export default ProfileField;

ProfileField.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	id: PropTypes.string,
};