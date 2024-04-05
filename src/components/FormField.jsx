import React from 'react';
import PropTypes from 'prop-types';

function FormField(props) {
	return (
		<div className='relative'>
			<input type='text' onChange={props.onChange} value={props.value} label={props.label} className='peer w-full border border-gray-400 py-2 px-5 rounded-md transition-all' />
			{!props.value && <span className='absolute peer-focus:bg-white px-1 left-2 peer-focus:text-sm translate-y-[7px] peer-focus:translate-y-[-10px] transition-all'>{props.label}</span>}
			{props.value && <span className='absolute bg-white px-1 left-2 text-sm translate-y-[-10px] transition-all'>{props.label}</span>}
		</div>

	);
}

FormField.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default FormField;
