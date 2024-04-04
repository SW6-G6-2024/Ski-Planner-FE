import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

const Modal = (props) => {
	return (
		<div className='z-[5000] absolute h-screen w-full flex items-center justify-center bg-[rgba(50,50,50,0.5)]'>
			<div className='bg-white w-[45%] z-[10000] rounded-lg'>
				<div className='flex justify-end '>
					<div className='mt-2 mr-2 px-1 py-1 flex text-slate-600 cursor-pointer hover:text-slate-500' onClick={props.closeFunc}>
						<CloseIcon
							style={{ fontSize: 30 }}
						/>
					</div>

				</div>
				{props.children}
			</div>
		</div>
	);
};

Modal.propTypes = {
	children: PropTypes.node,
	closeFunc: PropTypes.func.isRequired,
};

export default Modal;
