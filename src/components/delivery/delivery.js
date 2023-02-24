import React, { Component, createRef } from 'react';
import { AddressSuggestions } from 'react-dadata';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../button';
import WithProductsService from '../hoc/withProductsService';
import './delivery.css';
import 'react-dadata/dist/react-dadata.css';

class Delivery extends Component {
	tg = useTelegram().tg;
	city = createRef();
	street = createRef();
	house = createRef();


	onSendData = () =>{
		fetch(`https://dmnsmgn.ru/api/v1?total=${this.props.totalPrice(this.props.cart)}`).then(res => res.json()).then(data => {
			this.tg.MainButton.hide();
			document.location.href = data.confirmation.confirmation_url;
		});
	}

	componentDidUpdate(){
		const {adress, userInfo, type} = this.props;
		if(this.city.current && this.street.current){
			this.city.current.setInputValue(adress.city_with_type || adress.settlement_with_type);
			this.street.current.setInputValue(adress.street_with_type);
			this.house.current.setInputValue((adress.house_type ? adress.house_type + ' ' : '') + (adress.house ? adress.house + ' ' : '') + (adress.block_type ? adress.block_type + ' ' : '') + (adress.block ? adress.block : ''));
		}

		if((!userInfo?.fio || !userInfo?.phone || !userInfo?.email || !adress?.city || !adress?.postal_code || !adress?.street || !adress?.house) && (type === 'DELIVERY')){
			this.tg.MainButton.hide();
		} else {
			this.tg.MainButton.show();
		}
	}

	componentDidMount(){
		this.tg.MainButton.onClick(this.onSendData);
		this.tg.MainButton.hide();
		
	}

	componentWillUnmount(){
		this.tg.MainButton.offClick(this.onSendData);
	}

	render() {
		const {addAdress, addUserInfo, adress, cart, userInfo, changeType} = this.props;
		if(cart.length === 0){
			window.location.href = '/';
		}

		return (
			<div className='delivery'>
				<div className='delivery__header'>
					<Button type={'back'} onClick={() => this.props.navigate(-1)}/>
				</div>
				<div className='delivery__content'>
					<div className='title'>Выберите способ получения</div>
					<div className='delivery__tabs'>
						<input type='radio' name='tab-btn' id='tab-1' value='' onChange={() => changeType('PICKUP')}/>
						<label htmlFor='tab-1'>Самовывоз</label>
						<input type='radio' name='tab-btn' id='tab-2' value=''onChange={() => changeType('DELIVERY')}/>
						<label htmlFor='tab-2'>Доставка</label>
						
						<div id='content-2'>
							<div className='user-info'>
								<div className='form-elem'>
									<label>ФИО</label>
									<input 
									className='fio' 
									type='text' 
									value={userInfo?.fio || ''} 
									onChange={(e) =>{
										addUserInfo({...userInfo, fio: e.target.value});
									}}></input>
								</div>

								<div className='form-elem'>
									<label>Телефон</label>
									<input 
									className='phone' 
									type="tel"
									value={userInfo?.phone || ''} 
									onChange={(e) =>{
										addUserInfo({...userInfo, phone: e.target.value});
									}}></input>
								</div>

								<div className='form-elem'>
									<label>Почта</label>
									<input 
									className='email' 
									type='email' 
									value={userInfo?.email || ''} 
									onChange={(e) =>{
										addUserInfo({...userInfo, email: e.target.value});
									}}></input>
								</div>
							</div>
							<div className='form' >
								<div className='form-elem'>
									<label>Населенный пункт</label>
									<AddressSuggestions
									token='22cd6c7adac9d78ce2cb0559940b208f26701947'
									ref={this.city}
									filterFromBound='city'
									filterToBound='settlement'
									filterRestrictValue='true'
									count={5}
									onChange={(e) => {
										addAdress({...e.data});
									}}
									/>
								</div>
								<div className='form-elem'>
									<label>Улица</label>
									<AddressSuggestions
									token='22cd6c7adac9d78ce2cb0559940b208f26701947'
									filterFromBound='street'
									filterToBound='street'
									filterLocations={[{city: adress?.city, settlement: adress?.settlement}]}
									filterRestrictValue='true'
									ref={this.street}
									count={5}
									onChange={(e) => {
										addAdress({...e.data})
									}}
									/>
								</div>
								<div className='form-elem'>
									<label>Дом</label>
									<AddressSuggestions
									token='22cd6c7adac9d78ce2cb0559940b208f26701947'
									filterFromBound='house'
									filterToBound='house'
									ref={this.house}
									filterLocations={[{city: adress?.city, settlement: adress?.settlement, street: adress?.street, street_type_full: adress?.street_type_full}]}
									filterRestrictValue='true'
									count={5}
									onChange={(e) => {
										addAdress({...e.data})
									}}
									/>
								</div>
								<div className='form-elem'>
									<label>Квартира</label>
									<input 
									className='flat' 
									type='text' 
									value={adress?.flat || ''}
									onChange={(e) =>{
										addAdress({...adress, flat: e.target.value})
									}}></input>
								</div>

								<div className='form-elem'>
									<label>Индекс</label>
									<input 
									className='index' 
									type='text' 
									value={adress?.postal_code || ''}
									readOnly
									onChange={(e) =>{
										addAdress({...adress, postal_code: e.target.value})
									}}></input>
								</div>

							</div>
						</div>

						<div className='pickup' id='content-1'>
							Большая почтовая 18/20 корпус 11
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		adress: state.adress,
		cart: state.cart,
		userInfo: state.userInfo,
		type: state.type
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addAdress: (adress) => {
			dispatch({
				type: 'ADD_ADRESS',
				payload: adress
			})
		},
		addUserInfo: (userInfo) => {
			dispatch({
				type: 'ADD_USER_INFO',
				payload: userInfo
			})
		},
		changeType: (type) => {
			dispatch({
				type: 'CHANGE_TYPE',
				payload: type
			})
		}
	}
}

export default WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(Delivery));