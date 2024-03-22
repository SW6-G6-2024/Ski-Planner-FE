import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
	return (
		<button
			className={props.className ?? 'w-full bg-blue-500 rounded-lg border text-white hover:bg-blue-400 active:shadow-inner border-blue-300 active:border shadow-md hover:shadow-lg py-2'}
			onClick={props.onClick ?? (() => console.log('Button clicked'))}
		>
			{props.children ?? 'Click me'}
		</button>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	onClick: PropTypes.func,
};

export default Button;
