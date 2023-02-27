import React from 'react';
import WithProductsService from '../hoc/withProductsService';
import Button from '../button';
import { connect } from 'react-redux';
import './aboutProduct.css'

class AboutProduct extends React.Component {
	render() {
		const id = location.search.slice(1);
		const {addToCart, deleteFromCart, products, cart} = this.props;
		const product = products.find(item => item.id === id);
		let {src, title, descr, price} = product;
		const exist = cart.find(item => item.id === id);
		const count = exist ? exist.quantity : 0;
		
		return (
			<div className='product-card'>
				<div className='product-card__header'>
					<Button type={'back'} onClick={() => {
						this.props.navigate(-1);
						this.tg.HapticFeedback.impactOccurred('rigid');
					}}/>
				</div>	
				
				<div className='product-card__container'>
					<div className='image__container'>
						<img src={require('../../images/'+src)} alt='img'/>
					</div>
					<div className='title__container'>
						<div className='title'>{title}</div>
					</div>
					<div className='description__container'>
						<p className='description'>{descr}</p>
					</div>
				</div>
				<div className='product-card__footer'>
					<div className='card__price'>{price*count === 0 ? price : price*count} ₽</div>
					{count !== 0 ? (
						<div className={'btns ' + (count !== 0 ? 'active' : '')}>
							<Button type={'remove'} onClick={() => {
								this.tg.HapticFeedback.impactOccurred('rigid');
								deleteFromCart(product);
							}} />
							<div className='counter__container'>
								<div className='counter'>{count} шт.</div>
							</div>
							<Button type={'add'} onClick={() => {
								this.tg.HapticFeedback.impactOccurred('rigid');
								addToCart(product);
							}} />
						</div>
					) : (
						<div className='btns'>
							<Button type={'big-add'} onClick={() => {
								addToCart(product);
								this.tg.HapticFeedback.impactOccurred('rigid');
								}} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
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

export default WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(AboutProduct));