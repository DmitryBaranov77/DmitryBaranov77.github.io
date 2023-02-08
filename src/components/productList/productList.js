import React from 'react';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import WithProductsService from '../hoc/withProductsService';
import Product from '../product/product';
import './productList.css';

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return acc+=(item.price * item.quantity);
	}, 0);
}

class ProductList extends React.Component{
	tg = useTelegram().tg;
	
	componentDidMount() {
		const {ProductsService} = this.props;
		this.props.productsLoaded(ProductsService.getProducts());
	}

	onSendData = () => {
		const data = {
			cart: this.cart,
			totalPrice: getTotalPrice(this.cart)
		}
		this.tg.sendData(JSON.stringify(data));
	}

	componentDidUpdate(){
		const cart = this.props.cart;
		if(cart.length === 0){
			this.tg.MainButton.hide();
		} else {
			this.tg.MainButton.show();
			this.tg.MainButton.setParams({
				text: getTotalPrice(cart)
			})
		}
		this.tg.onEvent('mainButtonClicked', this.onSendData);
		return () => {
			this.tg.offEvent('mainButtonClicked', this.onSendData);
		}
	}

	render() {
		const { products, addToCart, deleteFromCart} = this.props;
		return (
			<div className='list'>
				
				{products.map(item => (
					<Product
						key={item.id}
						product={item}
						onInc={() => addToCart(item)}
						onDec={() => deleteFromCart(item)}
					/>
				))}
			</div>
		);
	}
};

const mapStateToProps = (state) =>{
	return {
		products: state.products,
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		productsLoaded: (newProducts) => {
			dispatch({
				type: 'NEW_PRODUCTS',
				payload: newProducts
			})
		},
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

export default WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(ProductList))