import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

const RegistrationForm = () => {
	const [fio, setFio] = useState('');
	const [adress, setadress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [valid, setValid] = useState('');

	const onChangeEmail = (e) => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(e.target.value)){
			
		} 
		setEmail(e.target.value);
	}

	return (
		<div className='reg'>
			<FloatingLabel label='Ваш email' controlId="floatingInput" className="mb-3">
				<Form.Control className='input' type='email' placeholder='name@example.com' value={email} onChange={onChangeEmail} isValid={false}/>
			</FloatingLabel>
		</div>
	);
};

export default RegistrationForm;