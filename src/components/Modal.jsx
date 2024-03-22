import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

const Modal = (props) => {
	return (
		<div className='bg-white min-w-[500px] z-[10000] absolute rounded-xl'>
			<div className='flex justify-end'>
				<div className='mt-2 mr-2 px-1 py-1 flex text-slate-600 cursor-pointer hover:text-slate-500' onClick={() => props.setShowProfileModal(false)}>
					<CloseIcon 
						style={{ fontSize: 30 }}
					/>
				</div>
			
			</div>
			{props.children}
		</div>
	);
};

Modal.propTypes = {
	children: PropTypes.node,
	setShowProfileModal: PropTypes.func,
};

export default Modal;
