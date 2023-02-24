import React, { Component, createRef } from 'react';
import { AddressSuggestions } from 'react-dadata';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../button';
import WithProductsService from '../hoc/withProductsService';
import './delivery.css';

class Delivery extends Component {
	tg = useTelegram().tg;
	city = createRef();
	street = createRef(<AddressSuggestions/>);

	onSendData = () =>{
		fetch(`https://dmnsmgn.ru/api/v1?total=${this.props.totalPrice(this.props.cart)}`).then(res => res.json()).then(data => {
			this.tg.MainButton.hide();
			document.location.href = data.confirmation.confirmation_url;
		});
	}

	componentDidUpdate(){
		const adress = this.props.adress;
		if(this.city.current && this.street.current){
			this.city.current.setInputValue(this.props.adress.city_with_type || this.props.adress.settlement_with_type);
			this.street.current.setInputValue(this.props.adress.street_with_type);
		}

		// if(!getIndex(adress) || !getCity(adress) || !getHouse(adress)){
		// 	this.tg.MainButton.hide();
		// } else {
		// 	this.tg.MainButton.show();
		// }
	}

	componentDidMount(){
		this.tg.MainButton.onClick(this.onSendData);
		this.tg.MainButton.hide();
		
	}

	componentWillUnmount(){
		this.tg.MainButton.offClick(this.onSendData);
	}

	render() {
		const {addAdress, adress, cart} = this.props;
		console.log(adress);
		// this.city.setInputValue(adress.city || adress.settlement);
		// if(cart.length === 0){
		// 	window.location.href = '/';
		// }

		return (
			<div className='delivery'>
				<div className='delivery__header'>
					<Button type={'back'} onClick={() => this.props.navigate(-1)}/>
				</div>
				<div className='delivery__content'>
					<div className='title'>Выберите способ получения</div>
					<div className='delivery__tabs'>
						<input type='radio' name='tab-btn' id='tab-1' value=''/>
						<label htmlFor='tab-1'>Самовывоз</label>
						<input type='radio' name='tab-btn' id='tab-2' value='' />
						<label htmlFor='tab-2'>Доставка</label>
						
						<div id='content-2'>
							<div className='form' >
								<div className='form-elem'>
									<label>Населенный пункт</label>
									<AddressSuggestions
									token='22cd6c7adac9d78ce2cb0559940b208f26701947'
									ref={this.city}
									filterFromBound='city'
									filterToBound='settlement'
									filterRestrictValue='true'
									
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
									filterLocations={[{city: adress?.city, settlement: adress?.settlement, street: adress?.street, street_type_full: adress?.street_type_full}]}
									filterRestrictValue='true'
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

const getRegion = (address) => {
	return join([
		join([address?.region_type, address?.region], " "),
		join([address?.area_type, address?.area], " ")
	])
}

const getCity = (address) => {
	return join([
		join([address?.city_type, address?.city], " "),
		join([address?.settlement_type, address?.settlement], " ")
	])
}

const getStreet = (address) => {
	return join([address?.street_type, address?.street], " ");
}

const getHouse = (address) => {
	return join([
		join([address?.house_type, address?.house], " "),
		join([address?.block_type, address?.block], " ")
	])
}

const getFlat = (address) => {
	return join([address?.flat_type, address?.flat], " ");
}

function join(arr){
	var separator = arguments.length > 1 ? arguments[1] : ", ";
	return arr.filter(function(n){return n}).join(separator);
}

const mapStateToProps = (state) => {
	return {
		adress: state.adress,
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addAdress: (adress) => {
			dispatch({
				type: 'ADD_ADRESS',
				payload: adress
			})
		}
	}
}

export default WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(Delivery));