import React, { useState } from 'react';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { useTelegram } from '../../hooks/useTelegram';
import './registrationForm.css';

const RegistrationForm = () => {
	const {tg} = useTelegram();
	const [fio, setFio] = useState('');
	const [adress, setAdress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState('');

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	}

	const onChangeFio = (e) => {
		setFio(e.target.value);
	}

	const onChangeAdress = (e) => {
		setAdress(e.target.value);
	}

	const onChangePhoneNumber = (e) => {
		setPhoneNumber(e.target.value);
	}


	const onBlurEmail = (e) => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(e.target.value)){
			setValidEmail('valid')
		} else {
			setValidEmail('invalid')
		}
	}

	return (
		<div className='reg'>
			<FloatingLabel label='Ваш email' controlId="floatingInput" className="mb-3">
				<Form.Control className={'input is-' + validEmail} type='email' placeholder='name@example.com' value={email} onChange={onChangeEmail} onBlur={onBlurEmail}/>
				<Form.Control.Feedback type='invalid'>Пожалуйста, укажите корректный email</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel label='Ваше ФИО' controlId="floatingInput" className="mb-3">
				<Form.Control className={'input'} type='text' placeholder='Иванов Иван Иванович' value={fio} onChange={onChangeFio} />
				<Form.Control.Feedback type='invalid'>Пожалуйста, укажите корректный email</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel label='Ваш адрес доставки' controlId="floatingInput" className="mb-3">
				<Form.Control className={'input'} type='adress' placeholder='name@example.com' value={email} onChange={onChangeEmail} onBlur={onBlurEmail}/>
				<Form.Control.Feedback type='invalid'>Пожалуйста, укажите корректный email</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel label='Ваш email' controlId="floatingInput" className="mb-3">
				<Form.Control className={'input is-' + validEmail} type='email' placeholder='name@example.com' value={email} onChange={onChangeEmail} onBlur={onBlurEmail}/>
				<Form.Control.Feedback type='invalid'>Пожалуйста, укажите корректный email</Form.Control.Feedback>
			</FloatingLabel>
		</div>
	);
};

export default RegistrationForm;