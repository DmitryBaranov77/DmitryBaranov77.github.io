import React from 'react';
import { connect } from 'react-redux';
import Button from '../button';
import './cartListItem.css';	

class CartListItem extends React.Component {

	render() {
		const products = this.props.products;
		const {id, size, color, quantity} = this.props.product;
		const {src, title, price} = products.find(item => item.id === id);
		let img = color === 'base' ? src : color.src;
		const {onInc, onDec} = this.props;
		return (
			<div className='cart-item'>
				<div className='cart-image__container'>
					<a href={'about?' + id}>
						<img src={require('../../images/'+img)}/>
					</a>
				</div>

				<div className='cart-item__container'>
					<div className='cart-item__header'>
						<div className='cart-item__title'>{title + (size !== 'base' ? ' ' +size : '') + (color !== 'base' ? ' ' + color.name : '')}</div>
					</div>
					<div className='cart-item__footer'>
						<div className='cart-price__container'>
							{price*quantity} ₽
						</div>
						<div className='cart-btn-container active'>
							<Button title={'-'} type={'remove'} onClick={() => {
								onDec();
							}}/>
								<div className='counter'>{quantity} шт.</div>
							<Button title={'+'} type={'add'} onClick={() => {
								onInc();
							}}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}

export default connect(mapStateToProps)(CartListItem);