import React from 'react';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../button';
import CartListItem from '../cartListItem/cartListItem';
import WithProductsService from '../hoc/withProductsService';
import { v4 as uuidv4 } from 'uuid';
import './cartList.css';

class CartList extends React.Component {
	tg = useTelegram().tg;

	onCreatePayment(){
		const idempotenceKey = uuidv4();
		fetch('https://api.yookassa.ru/v3/payments', {
			method: 'POST',
			headers: {
				'Idempotence-Key': idempotenceKey,
				'Content-Type': 'application/json',
				'Authorization': '983882:test_3QsLimRJIrI3puDS5pmPZaS5pCU5IpWmf6oOm737WwI'
			},
			body: JSON.stringify({
				'amount': {
					'value': '100.00',
					'currency': 'RUB'
				},
				'capture': true
			})
		}).then(response => {
			console.log(response);
		})
	}

	componentWillMount(){
		this.tg.MainButton.onClick(this.onCreatePayment);
	}

	componentWillUnmount(){
		this.tg.MainButton.offClick(this.onCreatePayment);
	}

	render() {
		const {cart, addToCart, deleteFromCart} = this.props;
		if(cart.length === 0){
			return(
				<div>
					<div className='cart-header'>
						<Button type={'back'} onClick={() => {
							this.props.navigate(-1);
							this.tg.HapticFeedback.impactOccurred('rigid');
						}}/>
					</div>
					<div>
						Ваша корзина пуста
					</div>
				</div>
				
			)
		} else {
			return (
				<div>
					<div className='cart-header'>
						<Button type={'back'} onClick={() => {
							this.props.navigate(-1);
							this.tg.HapticFeedback.impactOccurred('rigid');
						}}/>
					</div>
					<div className='cart-list'>
						{cart.map(item => (
							<CartListItem
							key={item.id}
							product={item}
							onInc={() => {
								addToCart(item);
								this.tg.HapticFeedback.impactOccurred('rigid');
							}}
							onDec={() => {
								deleteFromCart(item);
								this.tg.HapticFeedback.impactOccurred('rigid');
							}}
							/>
						))}
					</div>

					<div className='cart__footer'>
						<div className='cart-result'>
							Итого: {this.props.totalPrice(cart)} ₽
						</div>
					</div>
				</div>
			)
		}
	}
};

const mapStateToProps = (state) =>{
	return {
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		addToCart: (item) => {
			dispatch({
				type: 'ADD_TO_CART',
				payload: item
			})
		},
		deleteFromCart: (item) => {
			dispatch({
				type: 'DELETE_FROM_CART',
				payload: item
			})
		}
	}
}

export default WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(CartList));