import React, { useCallback, useEffect, useState } from 'react';
import { FloatingLabel, Form} from 'react-bootstrap';
import { AddressSuggestions } from 'react-dadata';
import { useTelegram } from '../../hooks/useTelegram';
import 'react-dadata/dist/react-dadata.css';
import './registrationForm.css';

const RegistrationForm = () => {
	const {tg} = useTelegram();
	const [fio, setFio] = useState('');
	const [adress, setAdress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState('');

	const onSendData = useCallback(() => {
		const data ={
			fio,
			adress,
			phoneNumber, 
			email
		}
		tg.sendData(JSON.stringify(data));
	}, [fio, ad, phoneNumber, email])

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		}
	}, [onSendData])

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Зарегистрироваться'
		})
	}, [])

	useEffect(() => {
		if(!fio || !adress || !phoneNumber || !email || !(validEmail = 'valid')){
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	}, fio, adress, phoneNumber, email, validEmail)

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
				<Form.Control className={'input is-' + validEmail} type='email' placeholder='name@example.com' value={email} onChange={onChangeEmail} onBlur={onBlurEmail}/>
				<Form.Control.Feedback type='invalid'>Пожалуйста, укажите корректный email</Form.Control.Feedback>

				<Form.Control className={'input'} type='text' placeholder='Иванов Иван Иванович' value={fio} onChange={onChangeFio} />
				<AddressSuggestions token='22cd6c7adac9d78ce2cb0559940b208f26701947' inputProps={{placeholder: 'Адрес', className:'react-dadata__input input form-control'}} suggestionsClassName='suggestion' value={adress} onChange={onChangeAdress}/>
				
				<Form.Control className={'input'} type='tel' placeholder='Номер телефона' value={phoneNumber} onChange={onChangePhoneNumber}/>
		
		</div>
	);
};

export default RegistrationForm;