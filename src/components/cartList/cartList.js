import React from 'react';
import { connect } from 'react-redux';
import CartListItem from '../cartListItem/cartListItem';

class CartList extends React.Component {
	render() {
		const {cart, addToCart, deleteFromCart} = this.props;
		if(cart.length === 0){
			return(
				<div>
					Ваша корзина пуста
				</div>
			)
		} else {
			return (
				<div className='cartList'>
					{cart.map(item => (
						<CartListItem
						key={item.id}
						product={item}
						onInc={() => addToCart(item)}
						onDec={() => deleteFromCart(item)}
						/>
					))}
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

export default connect(mapStateToProps)(CartList);