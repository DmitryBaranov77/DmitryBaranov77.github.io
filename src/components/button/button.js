import React from 'react';
import './button.css';

const Button = ({type, title, onClick}) => {
	
	return (
		<button
			className={`btn ${
				(type === 'add' && 'add') || 
				(type === 'remove' && 'remove') || 
				(type === 'big-add' && 'big-add') || 
				(type === 'cart' && 'cart') ||
				(type === 'back' && 'back')
			}`}
			onClick={onClick}
		>
		</button>
	);
};

export default Button;