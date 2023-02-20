import React from 'react';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../button';
import WithProductsService from '../hoc/withProductsService';
import Product from '../product/product';
import './productList.css';
class ProductList extends React.Component{
	tg = useTelegram().tg;
	navigate = this.props.navigate;
	totalPrice = this.props.totalPrice;
	
	componentDidMount() {
		const {ProductsService} = this.props;
		this.props.productsLoaded(ProductsService.getProducts());
		this.tg.MainButton.onClick(this.onGoCart);
		this.tg.MainButton.color = '#20B2AA';
	}

	onGoCart = () => {
		this.props.navigate('/cart');
	}

	componentDidUpdate(){
		const cart = this.props.cart;
		if(cart.length === 0){
			this.tg.MainButton.hide();
		} else {
			this.tg.MainButton.show();
			this.tg.MainButton.setParams({
				text: this.totalPrice(cart)+' ₽'
			})
		}
	}

	componentWillUnmount(){
		this.tg.MainButton.offClick(this.onGoCart);
	}

	render() {
		const { products, addToCart, deleteFromCart} = this.props;
		return (
			<div className='list-wrapper'>
				<div className='list-header'>
					<Button type={'cart'} onClick={() => {
						this.tg.HapticFeedback.impactOccurred('rigid');
						this.navigate('/cart');
					}}/>
				</div>
				<div className='list'>
					{products.map(item => (
						<Product
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

export default  WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(ProductList))