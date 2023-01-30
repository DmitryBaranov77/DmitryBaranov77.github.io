import React from 'react';
import './button.css';

const Button = ({type, title, onClick}) => {
	
	return (
		<button
			className={`btn ${
				(type === 'add' && 'add') || 
				(type === 'remove' && 'remove')
			}`}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default Button;